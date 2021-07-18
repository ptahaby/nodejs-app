import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from "../resources/users/user.service";
import User, { UserData } from '../resources/users/user.model';

export type AccessToken = {
    token: string;
}

@Injectable()
export class AuthService {
    userService: UsersService;

    jwtService: JwtService;

    constructor(userService: UsersService, jwtService: JwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

    async validateUser(login: string, password: string): Promise<UserData|null> {
        const user = await this.userService.getByLogin(login);
        if(user) {
            const isCompare = bcrypt.compareSync(password, user.password);
            if(isCompare) {
                return user;
            }
        } 
        return null;
    }

    login(user: User): AccessToken {
        const payload = { userId: user.id, login: user.login } ;
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
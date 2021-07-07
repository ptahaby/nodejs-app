import {Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserData } from '../resources/users/user.model';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private authService: AuthService

    constructor(authService: AuthService){
        super({usernameField: 'login'});
        this.authService = authService;
    }

    async validate(login: string, password: string): Promise<UserData> {
        const user = await this.authService.validateUser(login, password);
        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
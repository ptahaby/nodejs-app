import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../resources/users/user.module';
import { JWT_SECRET_KEY } from '../common/config';
import { JwtStrategy } from './jwt.strategy';


@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: JWT_SECRET_KEY,
            signOptions: { expiresIn: 60 * 60 * 24}
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports:[ AuthService]
})
export class AuthModule{}
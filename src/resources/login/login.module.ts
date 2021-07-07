import { Module } from '@nestjs/common';
import { LoginsController } from './login.controller';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [UserModule, AuthModule],
    controllers: [LoginsController],
})
export class LoginModule{}
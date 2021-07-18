import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TaskModule } from '../tasks/task.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [TaskModule, forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule{}
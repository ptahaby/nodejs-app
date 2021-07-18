import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TasksController } from './task.controller';

@Module({
    controllers: [TasksController],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule{}

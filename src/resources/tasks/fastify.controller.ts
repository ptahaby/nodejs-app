import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRequestBody, TaskResponse } from './task.model';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class TasksFastifyController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get(':boardId/tasks')
  async findAll(@Param('boardId') boardId: string): Promise<Array<TaskResponse>> {
    const tasks = await this.taskService.getTasks(boardId);
    return tasks
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string): Promise<TaskResponse|null> {
    const task = await this.taskService.getTaskById(boardId, taskId);
  
    if(task){
      return task
    } 
    return null;
  }

  @Post(':boardId/tasks')
  async create(@Param('boardId') boardId: string, @Body() taskBody: TaskRequestBody): Promise<TaskResponse> {
    const task = await this.taskService.create(boardId, taskBody);
    return task
  }

  @Put(':boardId/tasks/:taskId')
  async update(@Param('boardId') boardId: string,@Param('taskId') taskId: string, @Body() taskBody: TaskRequestBody): Promise<TaskResponse|null> {
    const task = await this.taskService.update(boardId, taskId, taskBody);
    if(task) {
      return task;
    } 
    return null;
  }

  @Delete(':boardId/tasks/:taskId')
  async delete(@Param('taskId') taskId: string): Promise<string> {
    const isDeleted = await this.taskService.deleteTask(taskId);
    if(isDeleted) {
      return 'The task has been deleted';
    } 
      return 'Task not found';
  }
}


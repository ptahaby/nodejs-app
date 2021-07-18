import { Response } from 'express';
import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRequestBody } from './task.model';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class TasksExpressController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get(':boardId/tasks')
  async findAll(@Param('boardId') boardId: string, @Res() res: Response): Promise<void> {
    const tasks = await this.taskService.getTasks(boardId);
    res.json(tasks);
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Res() res: Response): Promise<void> {
    const task = await this.taskService.getTaskById(boardId, taskId);
  
    if(task){
      res.json(task);
    } else{
      res.status(404).send();
    }
  }

  @Post(':boardId/tasks')
  async create(@Param('boardId') boardId: string, @Body() taskBody: TaskRequestBody, @Res() res: Response): Promise<void> {
    const task = await this.taskService.create(boardId, taskBody);
    res.status(201).json(task);
  }

  @Put(':boardId/tasks/:taskId')
  async update(@Param('boardId') boardId: string,@Param('taskId') taskId: string, @Body() taskBody: TaskRequestBody, @Res() res: Response): Promise<void> {
    const task = await this.taskService.update(boardId, taskId, taskBody);
    if(task) {
      res.json(task);
    } else {
      res.status(404).send();
    }
  }

  @Delete(':boardId/tasks/:taskId')
  async delete(@Param('taskId') taskId: string, @Res() res: Response): Promise<void> {
    const isDeleted = await this.taskService.deleteTask(taskId);
    if(isDeleted) {
      res.status(204).send('The task has been deleted');
    } else {
      res.status(404).send('Task not found');
    }
  }
}


import { Response } from 'express';
import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRequestBody } from './task.model';

@Controller('boards')
export class TasksController {
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


// const router  = Router();

// router.route('/:boardId/tasks').get(async(req: Request<{boardId: string}>, res: Response) => {
//   const tasks = await taskService.getTasks(req.params.boardId);
//   res.json(tasks);
// });

// router.route('/:boardId/tasks/:taskId').get(async(req: Request<{boardId: string, taskId: string}>, res: Response) => {
//   const { boardId, taskId } = req.params;
//   const task = await taskService.getTaskById(boardId, taskId);

//   if(task){
//     res.json(task);
//   } else{
//     res.status(404).send();
//   }
// });

// router.route('/:boardId/tasks').post(async(req: Request<{boardId: string}>, res: Response) => {
//   const { params: { boardId }, body } = req;
//   const task = await taskService.create(boardId, body);
//   res.status(201).json(task);
// });

// router.route('/:boardId/tasks/:taskId').put(async(req: Request<{boardId: string, taskId: string}>, res: Response) => {
//   const { boardId, taskId} = req.params;
//   const task = await taskService.update(boardId, taskId, req.body);
//   if(task) {
//     res.json(task);
//   } else {
//     res.status(404).send();
//   }
// });

// router.route('/:boardId/tasks/:taskId').delete(async(req: Request<{taskId: string}>, res: Response) => {
//   const { taskId } = req.params;
//   const isDeleted = await taskService.deleteTask(taskId);
//   if(isDeleted) {
//     res.status(204).send('The task has been deleted');
//   } else {
//     res.status(404).send('Task not found');
//   }
// });

// export default router;
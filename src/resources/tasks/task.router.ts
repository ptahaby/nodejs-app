import { Router, Request, Response } from 'express'
import * as taskService from './task.service';

const router  = Router();

router.route('/:boardId/tasks').get(async(req: Request<{boardId: string}>, res: Response) => {
  const tasks = await taskService.getTasks(req.params.boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async(req: Request<{boardId: string, taskId: string}>, res: Response) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTaskById(boardId, taskId);

  if(task){
    res.json(task);
  } else{
    res.status(404).send();
  }
});

router.route('/:boardId/tasks').post(async(req: Request<{boardId: string}>, res: Response) => {
  const { params: { boardId }, body } = req;
  const task = await taskService.create(boardId, body);
  res.status(201).json(task);
});

router.route('/:boardId/tasks/:taskId').put(async(req: Request<{boardId: string, taskId: string}>, res: Response) => {
  const { boardId, taskId} = req.params;
  const task = await taskService.update(boardId, taskId, req.body);
  if(task) {
    res.json(task);
  } else {
    res.status(404).send();
  }
});

router.route('/:boardId/tasks/:taskId').delete(async(req: Request<{taskId: string}>, res: Response) => {
  const { taskId } = req.params;
  const isDeleted = await taskService.deleteTask(taskId);
  if(isDeleted) {
    res.status(204).send('The task has been deleted');
  } else {
    res.status(404).send('Task not found');
  }
});

export default router;
const router = require('express').Router();
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async(req, res) => {
  const tasks = await taskService.getTasks(req.params.boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async(req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTaskById(boardId, taskId);
  if(task){
    res.json(task);
  } else{
    res.status(404).send();
  }
});

router.route('/:boardId/tasks').post(async(req, res) => {
  const { params: { boardId }, body } = req;
  const task = await taskService.create(boardId, body);
  res.status(201).json(task);
});

router.route('/:boardId/tasks/:taskId').put(async(req, res) => {
  const { boardId, taskId} = req.params;
  const task = await taskService.update(boardId, taskId, req.body);
  if(task) {
    res.json(task);
  } else {
    res.status(404).send();
  }
});

router.route('/:boardId/tasks/:taskId').delete(async(req, res) => {
  const { taskId } = req.params;
  const isDeleted = taskService.deleteTask(taskId);
  if(isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = router;
const taskRepo = require('./task.memory.repository');

const getTasks = (boardId) => taskRepo.getTasks(boardId);
const getTaskById = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);
const create = (boardId, task) => taskRepo.create(boardId, task);
const update = (boardId, taskId, task) => taskRepo.update(boardId, taskId, task);
const deleteTask = (taskId) => taskRepo.deleteTask(taskId);
const deleteTasksByBoardId = (boardId) => taskRepo.deleteTasksByBoardId(boardId);
const clearUserIdTasks = (userId) => taskRepo.clearUserIdTasks(userId);

module.exports = { 
  getTasks,
  getTaskById,
  create,
  update,
  deleteTask,
  deleteTasksByBoardId,
  clearUserIdTasks
};
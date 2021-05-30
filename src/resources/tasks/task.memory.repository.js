const Task = require('./task.model');

const tasks = new Map();

const getTasks = async (boardId) => {
  const boardTasks = Array.from(tasks.values())
    .filter(task => task.boardId === boardId);
  return boardTasks;
};

const getTaskById = async (boardId, taskId) => {
  const task = Array.from(tasks.values())
    .find(item => item.boardId === boardId && item.id === taskId);
  return task;
};

const create = async (boardId, data) => {
  const task = new Task({ ...data, boardId });
  tasks.set(task.id, task);
  return task;
};

const update = async (boardId, taskId, data) => {
  const task = Array.from(tasks.values())
    .find(item => item.boardId === boardId && item.id === taskId);
  if(task) {
    task.update(data);
    tasks.set(task.id, task);
  }
  return task;
};

const deleteTask = async (taskId) => {
  const isDeleted = tasks.delete(taskId);

  return isDeleted;
};

const deleteTasksByBoardId = (boardId) => {
  tasks.forEach((value) => {
    if(value.boardId === boardId) {
      tasks.delete(value.id);
    }
  });
};

const clearUserIdTasks = (userId) => {
  tasks.forEach((value) => {
    if(value.userId === userId) {
      value.updateUser(null);
    }
  });
};

module.exports = { 
  getTasks,
  getTaskById,
  create,
  update,
  deleteTask,
  deleteTasksByBoardId,
  clearUserIdTasks
};
const Task = require('./task.model');

/**
 * @const {Map<string, Task>}
 */
const tasks = new Map();

/**
 * Get tasks
 * @param {string} boardId first term
 * @returns {Promise<Array<Tasks>>} tasks
 */
const getTasks = async (boardId) => {
  const boardTasks = Array.from(tasks.values())
    .filter(task => task.boardId === boardId);
  return boardTasks;
};

/**
 * Get task by board id and task id
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @returns {Promise<Task>} task
 */
const getTaskById = async (boardId, taskId) => {
  const task = Array.from(tasks.values())
    .find(item => item.boardId === boardId && item.id === taskId);
  return task;
};

/**
 * 
 * @param {string} boardId first term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} data second term
 * @returns {Promise<Task>} task
 */
const create = async (boardId, data) => {
  const task = new Task({ ...data, boardId });
  tasks.set(task.id, task);
  return task;
};

/**
 * Update task
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} data third term 
 * @returns {Promise<Task>} task
 */
const update = async (boardId, taskId, data) => {
  const task = Array.from(tasks.values())
    .find(item => item.boardId === boardId && item.id === taskId);
  if(task) {
    task.update(data);
    tasks.set(task.id, task);
  }
  return task;
};

/**
 * Delete task by id
 * @param {string} taskId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteTask = async (taskId) => {
  const isDeleted = tasks.delete(taskId);

  return isDeleted;
};

/**
 * Delete task by board id
 * @param {string} boardId first term
 */
const deleteTasksByBoardId = (boardId) => {
  tasks.forEach((value) => {
    if(value.boardId === boardId) {
      tasks.delete(value.id);
    }
  });
};

/**
 * Clear user id of tasks
 * @param {string} userId first term
 */
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
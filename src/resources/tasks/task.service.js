const taskRepo = require('./task.memory.repository');

/**
 * Get tasks
 * @param {string} boardId first term
 * @returns {Promise<Array<Task>>} tasks
 */
const getTasks = (boardId) => taskRepo.getTasks(boardId);

/**
 * Get task
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @returns {Promise<Task>} task
 */
const getTaskById = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);

/**
 * Create Task
 * @param {string} boardId first term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task second term
 * @returns {Promise<Task>} task
 */
const create = (boardId, task) => taskRepo.create(boardId, task);

/**
 * Update the task
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task third term
 * @returns {Promise<Task>} task
 */
const update = (boardId, taskId, task) => taskRepo.update(boardId, taskId, task);

/**
 * Delete the task
 * @param {string} taskId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteTask = (taskId) => taskRepo.deleteTask(taskId);

/**
 * Delete tasks by board id
 * @param {string} boardId first term
 */
const deleteTasksByBoardId = (boardId) => taskRepo.deleteTasksByBoardId(boardId);

/**
 * Clear user ids for tasks
 * @param {string} userId first term
 */
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
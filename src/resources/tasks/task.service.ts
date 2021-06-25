import * as taskRepo from './task.memory.repository';
import Task, { TaskRequestBody, TaskResponse } from './task.model';

/**
 * Get tasks
 * @param {string} boardId first term
 * @returns {Promise<Array<Task>>} tasks
 */
const getTasks = (boardId: string): Promise<Array<Task>> => taskRepo.getTasks(boardId);

/**
 * Get task
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @returns {Promise<Task>} task
 */
const getTaskById = (boardId: string, taskId: string): Promise<TaskResponse|undefined> => taskRepo.getTaskById(boardId, taskId);

/**
 * Create Task
 * @param {string} boardId first term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task second term
 * @returns {Promise<Task>} task
 */
const create = (boardId: string, task: TaskRequestBody): Promise<TaskResponse>  => taskRepo.create(boardId, task);

/**
 * Update the task
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task third term
 * @returns {Promise<Task>} task
 */
const update = (boardId: string, taskId: string, task: TaskRequestBody): Promise<TaskResponse|undefined>  => taskRepo.update(boardId, taskId, task);

/**
 * Delete the task
 * @param {string} taskId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteTask = (taskId: string): Promise<boolean> => taskRepo.deleteTask(taskId);

/**
 * Delete tasks by board id
 * @param {string} boardId first term
 */
const deleteTasksByBoardId = (boardId: string): Promise<void> => taskRepo.deleteTasksByBoardId(boardId);

/**
 * Clear user ids for tasks
 * @param {string} userId first term
 */
const clearUserIdTasks = (userId: string): Promise<void> => taskRepo.clearUserIdTasks(userId);

export { 
  getTasks,
  getTaskById,
  create,
  update,
  deleteTask,
  deleteTasksByBoardId,
  clearUserIdTasks
};
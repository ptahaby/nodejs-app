import { getManager, getRepository } from 'typeorm'
import Board from '../boards/board.model';
import Column from '../boards/column.model';
import User from '../users/user.model';
import Task, { TaskRequestBody, TaskResponse } from './task.model';

const parseTaskForResponse = (task: Task):TaskResponse => ({id: String(task.id), title: task.title, order: task.order, description: task.description, userId: task.user?String(task.user.id): ''})
/**
 * Get tasks
 * @param {string} boardId first term
 * @returns {Promise<Array<Tasks>>} tasks
 */
const getTasks = async (boardId: string): Promise<Array<Task>> => 
    {
    const boardTasks = await getRepository(Task)
      .createQueryBuilder('task')
      .innerJoinAndSelect('task.board', 'board')
      .where('task.board = :id', {id: boardId})
      .getMany();
      return boardTasks
  };

/**
 * Get task by board id and task id
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @returns {Promise<Task>} task
 */
const getTaskById = async (boardId: string, taskId: string): Promise<TaskResponse|undefined> => {
    const task = await getRepository(Task)
    .createQueryBuilder('task')
    .leftJoinAndSelect('task.user', 'user')
    .leftJoinAndSelect('task.board', 'board')
    .select(['task.id as id', 'task.title as title','task.description as description', 'task.order as order', 'user.id as userId'])
    .where('task.boardId = :boardId', {boardId})
    .andWhere('task.id = :id', {id: taskId})
    .getRawOne();
    
    return {id: task.id, title: task.title, order: task.order, description: task.description, userId: task.userid}
  };

/**
 * 
 * @param {string} boardId first term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} data second term
 * @returns {Promise<Task>} task
 */

const create = async (boardId: string, data: TaskRequestBody): Promise<TaskResponse> => {
  const board = await getManager().findOne(Board, boardId) || null;
  const column = await getManager().findOne(Column, data.columnId) || null;
  const user = await getManager().findOne(User, data.userId) || null
  const newTask = new Task({ title: data.title, order: data.order, description: data.description })
  newTask.board = board;
  newTask.column = column;
  newTask.user = user;

  const task  = await getManager().save(newTask);
  return {id: String(task.id), title: task.title, order: task.order, description: task.description, userId: user?String(user.id): ''}
}

/**
 * Update task
 * @param {string} boardId first term
 * @param {string} taskId second term
 * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} data third term 
 * @returns {Promise<Task>} task
 */
const update = async (boardId: string, taskId: string, data: TaskRequestBody): Promise<TaskResponse|undefined> => {
    const board = await getManager().findOne(Board, boardId) || null;
    const column = await getManager().findOne(Column, data.columnId) || null;
    const user = await getManager().findOne(User, data.userId) || null
    const task = await getManager().findOne(Task, taskId) || null
    if(task) {
      task.title = data.title;
      task.order = data.order;
      task.description = data.description;
      task.board = board;
      task.user = user;
      task.column = column;
      const savedTask = await await getManager().save(task)
      return parseTaskForResponse(savedTask)
    }
    return undefined;
  };

/**
 * Delete task by id
 * @param {string} taskId first term
 * @returns {Promise<boolean>} boolean
 */
 const deleteTask = async (taskId: string): Promise<boolean> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(taskId);
  if(task) {
    task.user = null;
    task.board = null;
    task.column = null;
    const deletedTask = await taskRepository.remove(task);
    return !!deletedTask
  }
  return false
};

/**
* Delete task by board id
* @param {string} boardId first term
*/
const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
    const taskRepository = getRepository(Task);
    await taskRepository
    .createQueryBuilder('task')
    .delete()
    .where("task.board = :id", {id: boardId})
    .execute();
};

/**
* Clear user id of tasks
* @param {string} userId first term
*/
const clearUserIdTasks = async (userId: string): Promise<void> => {
  const repositoryTask = getRepository(Task)
  await repositoryTask
    .createQueryBuilder('task')
    .innerJoinAndSelect('task.user', 'user')
    .where('task.user = :id', {id: userId})
    .getMany();
};

export { 
  getTasks,
  getTaskById,
  create,
  update,
  deleteTask,
  deleteTasksByBoardId,
  clearUserIdTasks
};
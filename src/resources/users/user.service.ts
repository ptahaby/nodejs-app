import * as usersRepo from './user.memory.repository';
import * as taskService from '../tasks/task.service';
import User, { UserData } from './user.model'

/**
 * Get all users
 * @returns {Promise<Array<User>>} users
 */
const getAll = (): Promise<Array<User>> => usersRepo.getAll();

const getByLogin = (login:string): Promise<User|undefined> => usersRepo.getByLogin(login);

/**
 * Get user by id
 * @param {string} userId first term
 * @returns {Promise<User>}  user
 */
const getById = (userId: string): Promise<User|undefined> => usersRepo.getById(userId);

/**
 * Create user
 * @param {{name: string, login: string, password: string}} user first term
 * @returns {Promise<User>} user
 */
const create = (user: UserData): Promise<User> => usersRepo.create(user);

/**
 * Update user
 * @param {string} userId first term
 * @param {{name: string, login: string, password: string}} user second term
 * @returns {Promise<User>} user
 */
const update = (userId: string, user: UserData): Promise<User|undefined> => usersRepo.update(userId, user);

/**
 * Delete user
 * @param {string} userId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteUser = (userId: string): Promise<boolean> => {
  taskService.clearUserIdTasks(userId);
  return usersRepo.deleteUser(userId);
}

export {  deleteUser, update, create, getById, getAll, getByLogin };

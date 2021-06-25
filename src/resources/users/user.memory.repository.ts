import { getManager, getRepository } from 'typeorm'
import User, { UserData } from './user.model';

/**
 * Get all users
 * @returns {Promise<Array<User>>} users
 */
const getAll = async (): Promise<Array<User>> => { 
  const users = await getManager().find(User) || []
  // const newUsers = users.map(user => ({ ...user, id: String(user.id) }));
 
  return users; 
};

/**
 * Get user by id
 * @param {string} id first term
 * @returns {Promise<User>} user
 */
const getById = async (id: string): Promise< User | undefined> => {
    const user = await getManager().findOne(User, id);
    return user
  }

/**
 * Create user
 * @param {{name: string, login: string, password: string}} data first term
 * @returns {Promise<User>} user
 */
const create = async (data: UserData): Promise<User> =>  {
    const user = new User(data);
    const savedUser = await getManager().save(user);
    return savedUser;
  }

/**
 * Update the user
 * @param {string} userId first term
 * @param {{name: string, login: string, password: string}} data second term
 * @returns {Promise<User>} user
 */
const update = async (userId: string, data: UserData): Promise<User|undefined> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);
    if(user) {
      user.login = data.login;
      user.name = data.name;
      const updatedUser = await userRepository.save(user)
      return updatedUser; 
    }
    return undefined;
  }

/**
 * Delete the user
 * @param {string} userId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteUser = async(userId: string): Promise<boolean> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);
    if(user) {
      const isDeleted = await userRepository.remove(user);
      return !!isDeleted
    }
    return false
  }

export { deleteUser, update, create, getById, getAll };

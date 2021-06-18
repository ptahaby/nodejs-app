import User, { UserData } from './user.model';
import connectionDB from '../../sevices/connection.db';

/**
 * @const {Map<string, User>}
 */
const users: Map<string, User> = new Map();

/**
 * Get all users
 * @returns {Promise<Array<User>>} users
 */
const getAll = async (): Promise<Array<User>> => { 

  const userList = Array.from(users.values());
  return userList;
};

/**
 * Get user by id
 * @param {string} id first term
 * @returns {Promise<User>} user
 */
const getById = async (id: string): Promise< User | undefined | void> => connectionDB().then(async connection => {
    const user = connection.manager.findOne(User, id);
    return user
  }).catch(error => console.log(error))

/**
 * Create user
 * @param {{name: string, login: string, password: string}} data first term
 * @returns {Promise<User>} user
 */
const create = async (data: UserData): Promise<User|void> => connectionDB().then(connection => {
    const user = new User(data);
    return connection.manager.save(user).then((entity) => {
      console.log('User have been saved. User id is ', entity.id)
      return entity;
    })
  }).catch(error => console.log(error))

/**
 * Update the user
 * @param {string} userId first term
 * @param {{name: string, login: string, password: string}} data second term
 * @returns {Promise<User>} user
 */
const update = async (userId: string, data: UserData): Promise<User|undefined> => {
  const user = users.get(userId);
  if(user) {
    user.update(data);
    users.set(userId, user);
  }

  return user;
}

/**
 * Delete the user
 * @param {string} userId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteUser = async(userId: string): Promise<boolean> => {
  const isDeleted = users.delete(userId);
  return isDeleted;
}

export { deleteUser, update, create, getById, getAll };

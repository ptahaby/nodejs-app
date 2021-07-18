import { Injectable } from '@nestjs/common';
import * as usersRepo from './user.memory.repository';
import { TaskService } from '../tasks/task.service';
import User, { UserData } from './user.model'

@Injectable()
export class UsersService {
    private taskService: TaskService

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    /**
     * Get all users
     * @returns {Promise<Array<User>>} users
    */
    getAll(): Promise<Array<User>> {
        return usersRepo.getAll();
    }
 
    getByLogin(login:string): Promise<User|undefined> {
        return usersRepo.getByLogin(login)
    };

    /**
     * Get user by id
     * @param {string} userId first term
     * @returns {Promise<User>}  user
     */
    getById(userId: string): Promise<User|undefined> {
        return usersRepo.getById(userId);
    }

    /**
     * Create user
     * @param {{name: string, login: string, password: string}}
     * @returns {Promise<User>} user
     */
    create(user: UserData): Promise<User> {
        return usersRepo.create(user);
    } 

    /**
     * Update user
     * @param {string} userId first term
     * @param {{name: string, login: string, password: string}} user second term
     * @returns {Promise<User>} user
     */
    update(userId: string, user: UserData): Promise<User|undefined> {
        return usersRepo.update(userId, user); 
    }

    /**
     * Delete user
     * @param {string} userId first term
     * @returns {Promise<boolean>} boolean
     */
    deleteUser(userId: string): Promise<boolean>{
        return this.taskService.clearUserIdTasks(userId).then(() => usersRepo.deleteUser(userId));
    }
}


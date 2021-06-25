import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Task from '../tasks/task.model';

export type UserData = {
  id: number
  name: string;
  login: string;
  password: string;
}

export type UserResponse = {
  id:string;
  name: string;
  login: string
}
/**
 * Class representing a User
 */
@Entity()
class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[]

  /**
   * Create a User
   * @param {{name: string, login: string, password: string}} param0 first term
   */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {} as UserData) {
    this.name = name;
    this.login = login;
    this.password = password;
    // this.tasks = []
  }

  /**
   * Update the user
   * @param {{name: string, login: string, password: string}} user  first term
   */
  update(user: UserData): void {
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }
  
  /**
   * Parse user to response
   * @param {User} user first term
   */
  static toResponse(user: User): UserResponse {
    const { id, name, login } = user;
    return { id:String(id), name, login };
  }
}

export default User;

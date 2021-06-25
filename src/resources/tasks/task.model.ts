import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import User from '../users/user.model';
import Board from '../boards/board.model';
import ColumnModel from '../boards/column.model';

export type TaskData = {
  id?: string;
  title: string;
  order: number;
  description: string;
}

export type TaskRequestBody = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export type TaskResponse = {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string
}

/**
 * Class representing a Task
 */
@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column("int")
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.tasks)
  user!: User|null;

  @ManyToOne(() => Board, board => board.task)
  board!: Board|null;
  
  @ManyToOne(() => ColumnModel)
  column!: ColumnModel|null

  /**
   * create a Task
   * @param {{id: string, title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null }} param0  first term
   */
  constructor({
      title, order,
      description,
    } = {} as TaskData){
    this.title= title;
    this.order = order;
    this.description = description;
  }

  /**
   * Update the task
   * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task first term
   */
  update(task: TaskData): void {
    const {title, order, description } = task;
    this.title  =title;
    this.order = order;
    this.description = description;
  }

  /**
   * Update userId of task
   * @param {string} userId first term
   */
  updateUser(user: User|null): void {
    this.user = user;
  }
}

export default Task;
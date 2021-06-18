import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import User from '../users/user.model';
import Board from '../boards/board.model';
import ColumnModel from '../boards/column.model';

export type TaskData = {
  id?: string;
  title: string;
  order: number;
  description: string;
  user: User|null;
  board: Board|null;
  column: ColumnModel|null; 
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
  user: User|null;

  @OneToOne(() => Board)
  @JoinColumn()
  board: Board|null;
  
  @OneToOne(() => ColumnModel)
  @JoinColumn()
  column: ColumnModel|null

  /**
   * create a Task
   * @param {{id: string, title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null }} param0  first term
   */
  constructor({
      title, order,
      description,
      user = null,
      board = null,
      column=null } = {} as TaskData){
    this.title= title;
    this.order = order;
    this.description = description;
    this.user = user;
    this.board = board;
    this.column = column;
  }

  /**
   * Update the task
   * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task first term
   */
  update(task: TaskData): void {
    const {title, order, description, user, board, column} = task;
    this.title  =title;
    this.order = order;
    this.description = description;
    this.user = user;
    this.board = board;
    this.column = column;
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
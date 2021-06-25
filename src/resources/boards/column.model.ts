import { Entity, Column as  ColumnT, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import Board from './board.model';
import Task from '../tasks/task.model';

type ColumnData = {
  title: string,
  order: number,
}

/**
 * Class representing Column
 */
@Entity()
class Column {
  @PrimaryGeneratedColumn()
  id!: number;

  @ColumnT()
  title: string;

  @ColumnT()
  order: number;

  @ManyToOne(() => Board, board => board.columns)
  board!: Board

  @OneToMany(() => Task, task => task.column)
  task!: Task[]

  /**
   * Create a column
   * @param {{id: string, title: string, order: number}} param0 first term
   */
  constructor({ title, order } = {} as ColumnData) {
    this.title = title;
    this.order = order;
  }
}

export default Column;
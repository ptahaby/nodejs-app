import { Entity, Column as  ColumnT, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Board from './board.model';

type ColumnData = {
  title: string,
  order: number,
  board: Board
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
  board: Board

  /**
   * Create a column
   * @param {{id: string, title: string, order: number}} param0 first term
   */
  constructor({ title, order, board } = {} as ColumnData) {
    this.title = title;
    this.order = order;
    this.board = board
  }
}

export default Column;
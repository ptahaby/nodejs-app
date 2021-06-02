import { v4 } from 'uuid'
import Column from './column.model';

export type BoardType = {
  id?: string;
  title: string;
  columns: Array<Column>
}

/**
 * Class representing a Board
 */
class Board {

  id: string;

  title: string;

  columns: Array<Column>

  /**
   * Create a Board
   * @param {{id: string, title: string, columns: Array<Column>}} param0 first term
   */
  constructor({id = v4(), title = 'title', columns = []} ={} as BoardType ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
  *Update the board
  * @param {{title: string, columns: Array<Column>}} data first term
  */
  update(data: BoardType): void {
    const { title, columns } = data;
    this.title = title;
    if(columns && Array.isArray(columns)) {
      this.columns = columns.map(item => new Column(item));
    }
  }
}

export default Board;
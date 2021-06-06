import { v4 } from 'uuid'

type ColumnData = {
  id?: string,
  title: string,
  order: number
}

/**
 * Class representing Column
 */
class Column {

  id: string;

  title: string;

  order: number;

  /**
   * Create a column
   * @param {{id: string, title: string, order: number}} param0 first term
   */
  constructor({ id = v4(), title, order } = {} as ColumnData) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
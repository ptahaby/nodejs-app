const uuid = require('uuid');
const Column = require('./column.model');

/**
 * Class representing a Board
 */
class Board {
  /**
   * Create a Board
   * @param {{id: string, title: string, columns: Array<Column>}} param0 first term
   */
  constructor({id = uuid.v4(), title = 'title', columns = []} ={}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
  *Update the board
  * @param {{title: string, columns: Array<Column>}} data first term
  */
  update(data) {
    const { title, columns } = data;
    this.title = title;
    if(columns && Array.isArray(columns)) {
      this.columns = columns.map(item => new Column(item));
    }
  }
}

module.exports = Board;
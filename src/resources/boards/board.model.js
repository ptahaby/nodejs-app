const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({id = uuid.v4(), title = 'title', columns = []} ={}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  update(data) {
    const { title, columns } = data;
    this.title = title;
    if(columns && Array.isArray(columns)) {
      this.columns = columns.map(item => new Column(item));
    }
  }
}

module.exports = Board;
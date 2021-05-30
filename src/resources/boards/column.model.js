const uuid = require('uuid');

/**
 * Class representing Column
 */
class Column {
  /**
   * Create a column
   * @param {{id: string, title: string, order: number}} param0 first term
   */
  constructor({ id = uuid.v4(), title, order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
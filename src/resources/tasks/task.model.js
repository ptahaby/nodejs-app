const {v4: uuid} = require('uuid');

/**
 * Class representing a Task
 */
class Task {
  /**
   * create a Task
   * @param {{id: string, title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null }} param0  first term
   */
  constructor({
      id = uuid(),
      title, order,
      description,
      userId = null,
      boardId = null,
      columnId=null } = {}){
    this.id = id;
    this.title= title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Update the task
   * @param {{title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null}} task first term
   */
  update(task) {
    const {title, order, description, userId, boardId, columnId} = task;
    this.title  =title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Update userId of task
   * @param {string} userId first term
   */
  updateUser(userId) {
    this.userId = userId;
  }
}

module.exports = Task;
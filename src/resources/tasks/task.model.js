const {v4: uuid} = require('uuid');

class Task {
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

  update(task) {
    const {title, order, description, userId, boardId, columnId} = task;
    this.title  =title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  updateUser(userId) {
    this.userId = userId;
  }
}

module.exports = Task;
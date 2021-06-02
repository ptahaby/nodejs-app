import { v4 } from 'uuid'

export type TaskData = {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string|null;
  boardId: string|null;
  columnId: string|null; 
}

/**
 * Class representing a Task
 */
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string|null;

  boardId: string|null;
  
  columnId: string|null

  /**
   * create a Task
   * @param {{id: string, title: string, order: number, description: string, userId: string|null, boardId: string|null, columnId: string|null }} param0  first term
   */
  constructor({
      id = v4(),
      title, order,
      description,
      userId = null,
      boardId = null,
      columnId=null } = {} as TaskData){
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
  update(task: TaskData): void {
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
  updateUser(userId: string|null): void {
    this.userId = userId;
  }
}

export default Task;
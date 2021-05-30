const boardRepo = require('./board.memory.reporitory');
const taskService = require('../tasks/task.service');
/**
 * Get all boards
 * @returns{Promise<Array<Board>>} boards
 */
const getAll = () => boardRepo.getAll();

/**
 * Get Board by id
 * @param {string} id first term
 * @returns {Promise<Board>} board
 */
const getById = (id) => boardRepo.getById(id);

/**
 * Create board
 * @param {{title: string, columns: Array<Column>}} board first term
 * @returns {Promise<Board>} board
 */
const create = (board) => boardRepo.create(board);

/**
 * Update board
 * @param {string} id first term
 * @param {{title: string, column: Array<Column>}} board second term
 * @returns {Promise<Board>} board
 */
const update = (id, board) => boardRepo.update(id, board);

/**
 * Delete Board
 * @param {string} id first term
 * @returns {Promise<boolean>} boolean
 */
const deleteBoard = (id) => {
  taskService.deleteTasksByBoardId(id);
  return boardRepo.deleteBoard(id);
} 

module.exports = { getAll, getById, create, update, deleteBoard };
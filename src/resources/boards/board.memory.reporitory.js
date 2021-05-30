const Board = require('./board.model');
const Column = require('./column.model');

/**
 * @const {Map<string, Board>}
 */
const boards = new Map();

/**
 * Get all Boards from repositories
 *  @returns {Promise<Array<Boards>>} boards
 */
const getAll = async () => Array.from(boards.values());

/**
 * Get Board by id
 * @param {string} id first term
 * @returns {Board} board
 */
const getById = async (id) =>  boards.get(id);

/**
 * Create Board
 * @param {{title: string, columns: Array<Column>}} data first term
 * @returns {Promise<Board>} board
 */
const create = async (data) => {
  const { title, columns } = data;
  let columnList = [];

  if(columns &&  Array.isArray(columns)){
    columnList = columns.map(item => new Column(item));
  }

  const board = new Board({title, columns: columnList});
  boards.set(board.id, board);
  return board;
}

/**
 * Update Board
 * @param {string} boardId first term
 * @param {{title: string, columns: Array<Column>}} data second term
 * @returns {Promise<Board>} board
 */
const update = async (boardId, data) => {
  const board = boards.get(boardId);

  if(board) {
    board.update(data)
    boards.set(boardId, board);
  }

  return board;
}

/**
 * Delete board
 * @param {string} boardId first term
 * @returns {Promise<boolean>} board
 */
const deleteBoard = async (boardId) => boards.delete(boardId)



module.exports = { getAll, getById, create, update, deleteBoard };
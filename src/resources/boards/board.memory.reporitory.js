const Board = require('./board.model');
const Column = require('./column.model');

const boards = new Map();

const getAll = async () => Array.from(boards.values());

const getById = async (id) =>  boards.get(id);

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

const update = async (boardId, data) => {
  const board = boards.get(boardId);

  if(board) {
    board.update(data)
    boards.set(boardId, board);
  }

  return board;
}

const deleteBoard = async (boardId) => boards.delete(boardId)



module.exports = { getAll, getById, create, update, deleteBoard };
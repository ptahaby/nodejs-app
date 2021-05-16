const boardRepo = require('./board.memory.reporitory');

const getAll = () => boardRepo.getAll();
const getById = (id) => boardRepo.getById(id);
const create = (board) => boardRepo.create(board);
const update = (id, board) => boardRepo.update(id, board);
const deleteBoard = (id) => boardRepo.deleteBoard(id) 

module.exports = { getAll, getById, create, update, deleteBoard };
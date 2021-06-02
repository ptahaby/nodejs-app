import * as  boardRepo from './board.memory.reporitory';
import * as taskService from '../tasks/task.service';
import Board, { BoardType } from './board.model';
/**
 * Get all boards
 * @returns{Promise<Array<Board>>} boards
 */
const getAll = (): Promise<Array<Board>> => boardRepo.getAll();

/**
 * Get Board by id
 * @param {string} id first term
 * @returns {Promise<Board>} board
 */
const getById = (id: string): Promise<Board|undefined> => boardRepo.getById(id);

/**
 * Create board
 * @param {{title: string, columns: Array<Column>}} board first term
 * @returns {Promise<Board>} board
 */
const create = (board: BoardType): Promise<Board> => boardRepo.create(board);

/**
 * Update board
 * @param {string} id first term
 * @param {{title: string, column: Array<Column>}} board second term
 * @returns {Promise<Board>} board
 */
const update = (id: string, board: BoardType): Promise<Board|undefined> => boardRepo.update(id, board);

/**
 * Delete Board
 * @param {string} id first term
 * @returns {Promise<boolean>} boolean
 */
const deleteBoard = (id: string): Promise<boolean> => {
  taskService.deleteTasksByBoardId(id);
  return boardRepo.deleteBoard(id);
} 

export { getAll, getById, create, update, deleteBoard };
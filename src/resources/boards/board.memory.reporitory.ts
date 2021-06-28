import { getManager, getRepository } from 'typeorm'

import Column from './column.model';
import Board, { BoardType } from './board.model';

/**
 * Get all Boards from repositories
 *  @returns {Promise<Array<Boards>>} boards
 */
const getAll = async (): Promise<Array<Board>> => {
  const boards = await getManager().find(Board, { relations: ['columns']});
  return boards;
};

/**
 * Get Board by id
 * @param {string} id first term
 * @returns {Board} board
 */
const getById = async (id: string): Promise<Board|undefined> => {
  const board = await getManager().findOne(Board, id, { relations: ['columns']});
  return board;
};

/**
 * Create Board
 * @param {{title: string, columns: Array<Column>}} data first term
 * @returns {Promise<Board>} board
 */
const create = async (data: BoardType): Promise<Board|undefined> => {
    const columns: Array<Column> = []
    const promises: Array<Promise<Column>> = []
    for(let i = 0; i<data.columns.length; i+=1) {
      const entity = new Column(data.columns[i]);
      columns.push(entity);
      promises.push(new Promise((resolve) => {
          setTimeout(() => {
            resolve(getManager().save(entity))
          },0)
        }))
    }
    return Promise.allSettled(promises).then(async() => {
      const board = new Board(data);
      board.columns = columns;
      await getManager().save(board);
      return board;
    })
  };
  
/**
 * Update Board
 * @param {string} boardId first term
 * @param {{title: string, columns: Array<Column>}} data second term
 * @returns {Promise<Board>} board
 */
const update = async (boardId: string, data: BoardType): Promise<Board|undefined> => {
    const boardRepository = getRepository(Board);

    const board = await boardRepository.findOne(boardId);
    const savedBoard = await boardRepository.save({...board, ...data});
    return savedBoard;
    
  };

/**
 * Delete board
 * @param {string} boardId first term
 * @returns {Promise<boolean>} board
 */
const deleteBoard = async (boardId: string): Promise<boolean> => {
    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOne(boardId);
    if(board) {
      board.columns = []
      await boardRepository.save(board);
      const deletedBoard = await boardRepository.remove(board);
      return !!deletedBoard;
    }
    return false;
  };




export { getAll, getById, create, update, deleteBoard };
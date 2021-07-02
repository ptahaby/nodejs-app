import { Injectable } from '@nestjs/common';
import * as  boardRepo from './board.memory.reporitory';
import Board, { BoardType } from './board.model';

@Injectable()
export class BoardService {

/**
 * Get all boards
 * @returns{Promise<Array<Board>>} boards
 */
  getAll = (): Promise<Array<Board>> => boardRepo.getAll();

 /**
  * Get Board by id
  * @param {string} id first term
  * @returns {Promise<Board>} board
  */
  getById = (id: string): Promise<Board|undefined> => boardRepo.getById(id);
 
 /**
  * Create board
  * @param {{title: string, columns: Array<Column>}} board first term
  * @returns {Promise<Board>} board
  */
  create = (board: BoardType): Promise<Board|undefined> => boardRepo.create(board);
 
 /**
  * Update board
  * @param {string} id first term
  * @param {{title: string, column: Array<Column>}} board second term
  * @returns {Promise<Board>} board
  */
  update = (id: string, board: BoardType): Promise<Board|undefined> => boardRepo.update(id, board);
 
 /**
  * Delete Board
  * @param {string} id first term
  * @returns {Promise<boolean>} boolean
  */
  deleteBoard = (id: string): Promise<boolean> =>  
     boardRepo.deleteBoard(id)
}

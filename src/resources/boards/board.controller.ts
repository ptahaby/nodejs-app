import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import Board, { BoardType, BoardResponse } from './board.model';
import { BoardService }  from './board.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  private boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

  @Get()
  async findAll(): Promise<Array<BoardResponse>> {
    const boards = await this.boardService.getAll();
    return boards.map(Board.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BoardResponse|null> {
    const board = await this.boardService.getById(id);
    if(board){
      return Board.toResponse(board);
    } 
    return null;
  }

  @Post()
  async create(@Body() createBoard: BoardType): Promise<BoardResponse|null> {
    const board = await this.boardService.create(createBoard);
    if(board) {
      return Board.toResponse(board);
    }
    return null;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoard: BoardType): Promise<BoardResponse|null> {
    const board = await this.boardService.update(id, updateBoard);
    if(board){
      return Board.toResponse(board);
    } 
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    const isDeleted = await this.boardService.deleteBoard(id);
    if(isDeleted) {
      return 'The board has been deleted';
    } 
    return 'Board not found'; 
  }
}

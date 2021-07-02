import { Request, Response } from 'express';
import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import Board, { BoardType } from './board.model';
import { BoardService }  from './board.service';

@Controller('boards')
export class BoardsController {
  private boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

  @Get()
  async findAll(_: Request, @Res() res: Response): Promise<void> {
    const boards = await this.boardService.getAll();
    res.json(boards.map(Board.toResponse));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const board = await this.boardService.getById(id);
    if(board){
      res.json(Board.toResponse(board));
    } else{
      res.status(404).send();
    }
  }

  @Post()
  async create(@Body() createBoard: BoardType, @Res() res: Response): Promise<void> {
    const board = await this.boardService.create(createBoard);
    if(board) {
      res.status(201).json(Board.toResponse(board));
    }
    res.status(400)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoard: BoardType, @Res() res: Response): Promise<void> {
    const board = await this.boardService.update(id, updateBoard);
    if(board){
      res.json(Board.toResponse(board));
    } else {
      res.status(404).send();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const isDeleted = await this.boardService.deleteBoard(id);
    if(isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }
}



// const router = Router();

// router.route('/').get(async (_, res: Response) => {
//   const boards = await boardService.getAll();
//   res.json(boards.map(Board.toResponse));
// });

// router.route('/:id').get(async (req: Request<{id: string}>, res: Response) => {
//   const {id} = req.params;
//   const board = await boardService.getById(id);
//   if(board){
//     res.json(Board.toResponse(board));
//   } else{
//     res.status(404).send();
//   }
// });

// router.route('/').post(async (req: Request, res: Response) => {
//   const board = await boardService.create(req.body);
//   if(board) {
//     res.status(201).json(Board.toResponse(board));
//   }
//   res.status(400)
// });

// router.route('/:id').put(async (req: Request<{id: string}>, res: Response) => {
//   const board = await boardService.update(req.params.id, req.body);
//   if(board){
//     res.json(Board.toResponse(board));
//   } else {
//     res.status(404).send();
//   }
// });

// router.route('/:id').delete(async (req: Request<{id: string}>,res: Response) => {
//   const isDeleted = await boardService.deleteBoard(req.params.id);
//   if(isDeleted) {
//     res.status(204).send();
//   } else {
//     res.status(404).send();
//   }
// });

// export default router;
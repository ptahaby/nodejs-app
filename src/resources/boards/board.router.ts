import { Router, Request, Response } from 'express';
import * as boardService from './board.service';

const router = Router();

router.route('/').get(async (_, res: Response) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req: Request<{id: string}>, res: Response) => {
  const {id} = req.params;
  const board = await boardService.getById(id);
  if(board){
    res.json(board);
  } else{
    res.status(404).send();
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  const board = await boardService.create(req.body);
  res.status(201).json(board);
});

router.route('/:id').put(async (req: Request<{id: string}>, res: Response) => {
  const board = await boardService.update(req.params.id, req.body);
  if(board){
    res.json(board);
  } else {
    res.status(404).send();
  }
});

router.route('/:id').delete(async (req: Request<{id: string}>,res: Response) => {
  const isDeleted = await boardService.deleteBoard(req.params.id);
  if(isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

export default router;
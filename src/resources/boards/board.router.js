const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const {id} = req.params;
  const board = await boardService.getById(id);
  if(board){
    res.json(board);
  } else{
    res.status(404).send();
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(req.body);
  res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(req.params.id, req.body);
  if(board){
    res.json(board);
  } else {
    res.status(404).send();
  }
});

router.route('/:id').delete(async (req,res) => {
  const isDeleted = await boardService.deleteBoard(req.params.id);
  if(isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = router;
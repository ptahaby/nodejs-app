import { Router } from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router = Router();
router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params
  const user = await usersService.getById(id);
  if(user) {
    res.json(User.toResponse(user));
  } else {
    res.send(404).send();
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User(req.body));
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  if(user) {
    res.json(User.toResponse(user));
  } else {
    res.send(404).send();
  }});

router.route('/:id').delete(async (req, res) => {
  const isDeleted = await usersService.deleteUser(req.params.id);
  if(isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  } 
});

export default router;

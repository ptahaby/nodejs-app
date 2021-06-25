import { Router, Request, Response } from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router = Router();
router.route('/').get(async (_, res: Response) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req: Request<{id: string}>, res) => {
  const { id } = req.params
  const user = await usersService.getById(id);
  if(user) {
    res.json(User.toResponse(user));
  } else {
    res.send(404).send();
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  try{
    const user = await usersService.create(new User(req.body));
    res.status(201).json(User.toResponse(user));
  } catch(e) {
    console.log(e)
  }
 
});

router.route('/:id').put(async (req: Request<{id: string}>, res: Response) => {
  const user = await usersService.update(req.params.id, req.body);
  if(user) {
    res.json(User.toResponse(user));
  } else {
    res.send(404).send();
  }});

router.route('/:id').delete(async (req: Request<{id: string}>, res: Response) => {
  const isDeleted = await usersService.deleteUser(req.params.id);
  if(isDeleted) {
    res.status(204).send('The user has been deleted');
  } else {
    res.status(404).send('User not found');
  } 
});

export default router;

import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/user.service'
import { JWT_SECRET_KEY } from '../../common/config'

type LoginData = {
  login: string;
  password: string;
}
@Controller('login')
export class LoginsController {
  private userService: UsersService;

  constructor(userService: UsersService) {
    this.userService = userService;
  }

  @Post()
  async login(@Body() loginBody: LoginData, @Res() res: Response): Promise<void> {
    const {login, password} = loginBody
    const user = await this.userService.getByLogin(login);
    if(user) {
      const isCompare = bcrypt.compareSync(password, user.password);
      if(isCompare && JWT_SECRET_KEY && user) {
        const token = jwt.sign({userId: user.id, login: user.login }, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
        res.status(200).json({token});
      } else {
        res.status(401).send('Unauthorized error')
      }
    } else {
      res.status(404).send();
    }
  }
}
// const router  = Router();

// router.route('/').post(async (req: Request, res: Response) => {
//   const {login, password} = req.body as {login: string, password: string}
//   const user = await getByLogin(login);
//   if(user) {
//     const isCompare = bcrypt.compareSync(password, user.password);
//     if(isCompare && JWT_SECRET_KEY && user) {
//       const token = jwt.sign({userId: user.id, login: user.login }, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
//       res.status(200).json({token});
//     } else {
//       res.status(401).send('Unauthorized error')
//     }
//   } else {
//     res.status(404).send();
//   }
// });

// export default router;
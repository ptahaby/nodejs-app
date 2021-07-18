import { Request, Response, NextFunction,  } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { UsersService } from '../resources/users/user.service';

interface JwtPayloadWithUser extends JwtPayload {
  userId: string,
  login: string
}

@Injectable()
export class VerifySession implements NestMiddleware {
  private userService: UsersService;

  constructor(userService: UsersService) {
    this.userService = userService
  }

  async use(req: Request, res: Response, next: NextFunction):Promise<void> {
    if(req.method === 'OPTIONS') {
      next();
    } else {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1] || ''
      if(!authHeader) {
        res.status(401).send('Unauthorized')
      } else {
        try{
          const decoded = jwt.verify(token, JWT_SECRET_KEY || '') as JwtPayloadWithUser 
          const user = await this.userService.getById(decoded.userId);
          if(user) {
            req.user = user;
            next();
          } else {
            res.status(403).send({error: 'Forbidden'})
          }
        } catch(err) {
          res.status(401).send({error: 'Unauthorized'})
        }
      }
    }
  }
}

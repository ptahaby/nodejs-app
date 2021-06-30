import { Request, Response, NextFunction,  } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { getById } from '../resources/users/user.service';

interface JwtPayloadWithUser extends JwtPayload {
  userId: string,
  login: string
}

export const  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
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
        const user = await getById(decoded.userId);
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
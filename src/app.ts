import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import fs from 'fs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import { logRequest, logErrorHandler, getFormattedDate } from './middleware/logger';
import { verifyToken } from  './middleware/verify-session';
import 'reflect-metadata';

process.on('uncaughtException', (error: Error) => {
  const log = `[${getFormattedDate()}] UNCAUGHT EXCEPTION: ${error.stack || error.message}`;

  fs.appendFile(`${__dirname  }/../../logs.txt`, `${log  }\n`, (err) => {
    if(err) throw err;
  });
})

process.on('unhandledRejection', (error: Error) => {
  const log = `[${getFormattedDate()}] UNHANDLED REJECTION: ${error.stack || error.message}`;

  fs.appendFile(`${__dirname  }/../../logs.txt`, `${log  }\n`, (err) => {
    if(err) throw err;
  });
})

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequest);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use(verifyToken);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use(logErrorHandler);

export default  app;

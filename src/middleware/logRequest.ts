import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { getFormattedDate, addLogsToFile, REQUEST_LOGS  } from '../common/logger'


@Injectable()
export class LoggerReqMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction):void{
    const { url, method, body, query } = req
    const formattedBody = JSON.stringify(body);
    const formattedParams = JSON.stringify(query);
    res.on('finish', () => {
        const { statusCode } = res;
        const log = `[${getFormattedDate()}] ${method}:${url} ${statusCode}; Query params: ${formattedParams}; Body: ${formattedBody}`;
        addLogsToFile(log, REQUEST_LOGS);
    })
    next();
  }
}

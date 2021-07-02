// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { getFormattedDate, addLogsToFile, ERROR_LOGS  } from '../common/logger'

// @Injectable()
// export class LoggerErrorMiddleware implements NestMiddleware {
//     use(_: Request, res: Response, next: NextFunction): void {
//         // if(error instanceof Error) {
//         //     const log = `[${getFormattedDate()}] Error: ${error.stack}`
//         //     addLogsToFile(log, ERROR_LOGS);
//         //     res.status(500).send('Something broke');
//         // } else {
//         //     next();
//         // }
//     }
// }

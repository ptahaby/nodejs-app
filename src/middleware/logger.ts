import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

const ERROR_LOGS = '/../../error-logs.txt';
const REQUEST_LOGS = '/../../request-logs.txt';

export const getFormattedDate = (): string => {
    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`
    return formattedDate;
}

const addLogsToFile = (logs: string, file: typeof ERROR_LOGS | typeof REQUEST_LOGS) => {
    fs.appendFile(`${__dirname}${file}`, `${logs  }\n`, (err) => {
      if(err) throw err;
    });
  }

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
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

export const logErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction): void => {
    if(error instanceof Error) {
        const log = `[${getFormattedDate()}] Error: ${error.stack}`
        addLogsToFile(log, ERROR_LOGS);
        res.status(500).send('Something broke');
    } else {
        next();
    }
}

export const unhandledRejection =  (error: Error): void => {
    const log = `[${getFormattedDate()}] UNHANDLED REJECTION: ${error.stack || error.message}`;
    addLogsToFile(log, ERROR_LOGS);
  }
  
  export const uncaughtException = (error: Error): void => {
    const log = `[${getFormattedDate()}] UNCAUGHT EXCEPTION: ${error.stack || error.message}`;
    addLogsToFile(log, ERROR_LOGS);
  } 
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

const getFormattedDate = (): string => {
    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`
    return formattedDate;
}
const addLogsToFile = (logs: string) => {
  fs.appendFile(`${__dirname  }/../../logs.txt`, `${logs  }\n`, (err) => {
    if(err) throw err;
  });
}

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { url, method, body, query } = req
    const { statusCode } = res;
    const formattedBody = JSON.stringify(body);
    const formattedParams = JSON.stringify(query);
    const log = `[${getFormattedDate()}] ${method}:${url} ${statusCode}; Query params: ${formattedParams}; Body: ${formattedBody}`;
    addLogsToFile(log);
    next();
}

export const logErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction): void => {
    if(error instanceof Error) {
        const log = `[${getFormattedDate()}] Error: ${error.stack}`
        addLogsToFile(log);
        res.status(500).send('Something broke');
    } else {
        next();
    }
}

export const unhandledRejection =  (error: Error): void => {
  const log = `[${getFormattedDate()}] UNHANDLED REJECTION: ${error.stack || error.message}`;
  addLogsToFile(log);
}

export const uncaughtException = (error: Error): void => {
  const log = `[${getFormattedDate()}] UNCAUGHT EXCEPTION: ${error.stack || error.message}`;
  addLogsToFile(log);
}
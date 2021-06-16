import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const getFormattedDate = (): string => {
    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`
    return formattedDate;
}

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { url, method, body, query } = req
    const formattedBody = JSON.stringify(body);
    const formattedParams = JSON.stringify(query);
    res.on('finish', () => {
        const { statusCode } = res;
        const log = `[${getFormattedDate()}] ${method}:${url} ${statusCode}; Query params: ${formattedParams}; Body: ${formattedBody}`;
        fs.appendFile(`${__dirname  }/../../logs.txt`, `${log  }\n`, (err) => {
            if(err) throw err;
        })
    })

    next();
}

export const logErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction): void => {
    if(error instanceof Error) {
        const log = `[${getFormattedDate()}] Error: ${error.stack}`
        fs.appendFile(`${__dirname  }/../../logs.txt`, `${log }\n`, (err) => {
            if(err) throw err;
        })
        res.status(500).send('Something broke');
    } else {
        next();
    }
}

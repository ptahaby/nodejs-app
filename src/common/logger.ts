import fs from 'fs';

export const ERROR_LOGS = '/../../error-logs.txt';
export const REQUEST_LOGS = '/../../request-logs.txt';

export const getFormattedDate = (): string => {
    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`
    return formattedDate;
}

export const addLogsToFile = (logs: string, file: typeof ERROR_LOGS | typeof REQUEST_LOGS) => {
    fs.appendFile(`${__dirname}${file}`, `${logs  }\n`, (err) => {
      if(err) throw err;
    });
  }

  export const unhandledRejection =  (error: Error): void => {
    const log = `[${getFormattedDate()}] UNHANDLED REJECTION: ${error.stack || error.message}`;
    addLogsToFile(log, ERROR_LOGS);
  }
  
  export const uncaughtException = (error: Error): void => {
    const log = `[${getFormattedDate()}] UNCAUGHT EXCEPTION: ${error.stack || error.message}`;
    addLogsToFile(log, ERROR_LOGS);
  } 
import { createConnection, Connection } from 'typeorm';

import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from '../common/config'
import Board from '../resources/boards/board.model';
import Column from '../resources/boards/column.model';
import Task from '../resources/tasks/task.model';
import User from '../resources/users/user.model';

const connection = ():Promise<Connection> => createConnection({
    type: 'postgres',
    host: 'localhost',
    port: POSTGRES_PORT ? Number(POSTGRES_PORT): undefined,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [
        User,
        Board,
        Column,
        Task
    ],
    synchronize: true,
    logging: false
});

export default connection;

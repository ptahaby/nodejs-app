import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginsController } from "./resources/login/login.controller"; 
import { UsersController } from './resources/users/user.controller';
import { BoardsController } from "./resources/boards/board.controller";
import { TasksController } from "./resources/tasks/task.controller";
import { UsersService } from "./resources/users/user.service";
import { BoardService } from "./resources/boards/board.service";
import { TaskService } from "./resources/tasks/task.service";

import { LoggerReqMiddleware } from './middleware/logRequest'
import { VerifySession } from './middleware/verify-session';
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_PORT, POSTGRES_HOST } from './common/config'

const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: POSTGRES_HOST || 'localhost',
    port: parseInt(POSTGRES_PORT, 10),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [
        'src/resources/users/user.model.ts',
        'src/resources/boards/board.model.ts',
        'src/resources/boards/column.model.ts',
        'src/resources/tasks/task.model.ts'
    ],
    synchronize: false,
    keepConnectionAlive: true,
    logging: false,
    cli: { migrationsDir: '../migration'},
    migrations: ['../migration/*.ts']
})

@Module({
    imports: [typeOrmModule],
    controllers: [LoginsController, UsersController, BoardsController, TasksController],
    providers: [UsersService, BoardService, TaskService]
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer):void {
        consumer
            .apply(LoggerReqMiddleware)
            .forRoutes(LoginsController, UsersController, BoardsController, TasksController);
        consumer
            .apply(VerifySession)
            .exclude('login', 'doc')
    }
};

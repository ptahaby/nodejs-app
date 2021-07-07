module.exports = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [
        'src/resources/users/user.model.ts',
        'src/resources/boards/board.model.ts',
        'src/resources/boards/column.model.ts',
        'src/resources/tasks/task.model.ts'
    ],
    synchronize: false,
    keepConnectionAlive: true,
    logging: false,
    cli: {'migrationDir': 'migration'},
    migrations: ['migration/*.ts']
}
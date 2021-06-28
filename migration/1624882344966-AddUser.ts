import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUser1624882344966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`INSERT INTO course.user (name, login, password) VALUES ("Andrey", "shparkiptah", "mypassword");`);
        await queryRunner.manager.createQueryBuilder().insert().into('user').values({name: 'Andrey', login: 'shparkiptah', password: '12345'}).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM course.user WHERE login="shparkiptah";`);
        await queryRunner.manager.createQueryBuilder().delete().from('user').where('login = :login', {login: 'shparkiptah'}).execute();

    }
}

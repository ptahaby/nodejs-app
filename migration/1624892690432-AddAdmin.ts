import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdmin1624892690432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert().into('user').values({name: 'admin', login: 'admin', password: 'admin'}).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().delete().from('user').where('login = :login', {login: 'admin'}).execute();
    }

}

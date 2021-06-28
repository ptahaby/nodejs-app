import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../src/common/config'
export class AddAdmin1624892690432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS, 2))
        const hash = bcrypt.hashSync('admin', salt);
        await queryRunner.manager.createQueryBuilder().insert().into('user').values({name: 'admin', login: 'admin', password: hash}).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().delete().from('user').where('login = :login', {login: 'admin'}).execute();
    }

}

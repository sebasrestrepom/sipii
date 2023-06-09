import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1686257357044 implements MigrationInterface {
    name = 'UserTable1686257357044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "document" integer NOT NULL, "age" integer NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

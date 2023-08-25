import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUserSchema1692995250490 implements MigrationInterface {
    name = 'NewUserSchema1692995250490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "document_type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "department" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_335a7b396d5a7b840e2e31200b4" UNIQUE ("email", "document")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_335a7b396d5a7b840e2e31200b4"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "document_type"`);
    }

}

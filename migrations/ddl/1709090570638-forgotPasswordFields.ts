import { MigrationInterface, QueryRunner } from "typeorm";

export class ForgotPasswordFields1709090570638 implements MigrationInterface {
    name = 'ForgotPasswordFields1709090570638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_password_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "expiration_reset_password_token" integer`);
        await queryRunner.query(`ALTER TABLE "credit" ALTER COLUMN "status" SET DEFAULT 'Pendiente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ALTER COLUMN "status" SET DEFAULT 'Pending'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "expiration_reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_password_token"`);
    }

}

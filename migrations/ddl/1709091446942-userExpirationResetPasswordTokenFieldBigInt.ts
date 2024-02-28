import { MigrationInterface, QueryRunner } from "typeorm";

export class UserExpirationResetPasswordTokenFieldBigInt1709091446942 implements MigrationInterface {
    name = 'UserExpirationResetPasswordTokenFieldBigInt1709091446942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "expiration_reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "expiration_reset_password_token" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "expiration_reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "expiration_reset_password_token" integer`);
    }

}

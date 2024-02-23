import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationCodeField1705286218439 implements MigrationInterface {
    name = 'VerificationCodeField1705286218439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ADD "verification_code" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "verification_code"`);
    }

}

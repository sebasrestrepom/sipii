import { MigrationInterface, QueryRunner } from "typeorm";

export class FixVerificationCodeField1705286655078 implements MigrationInterface {
    name = 'FixVerificationCodeField1705286655078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ALTER COLUMN "verification_code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ALTER COLUMN "verification_code" SET NOT NULL`);
    }

}

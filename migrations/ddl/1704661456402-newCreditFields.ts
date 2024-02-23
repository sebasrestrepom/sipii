import { MigrationInterface, QueryRunner } from "typeorm";

export class NewCreditFields1704661456402 implements MigrationInterface {
    name = 'NewCreditFields1704661456402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ADD "disbursed" boolean`);
        await queryRunner.query(`ALTER TABLE "credit" ADD "accept_terms" boolean`);
        await queryRunner.query(`ALTER TABLE "credit" ADD "signed" boolean`);
        await queryRunner.query(`ALTER TABLE "credit" ALTER COLUMN "status" SET DEFAULT 'Pendiente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ALTER COLUMN "status" SET DEFAULT 'Activo'`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "signed"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "accept_terms"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "disbursed"`);
    }

}

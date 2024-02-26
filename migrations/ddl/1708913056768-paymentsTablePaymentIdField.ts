import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentsTablePaymentIdField1708913056768 implements MigrationInterface {
    name = 'PaymentsTablePaymentIdField1708913056768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_id"`);
    }

}

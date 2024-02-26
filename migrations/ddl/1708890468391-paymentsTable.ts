import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentsTable1708890468391 implements MigrationInterface {
    name = 'PaymentsTable1708890468391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "authorization_code" character varying, "cardholder" character varying, "expiration_month" integer, "expiration_year" integer, "first_six_digits" character varying, "last_four_digits" character varying, "currency_id" character varying, "date_approved" character varying, "date_created" character varying, "description" character varying, "payment_method_id" character varying, "payment_type_id" character varying, "status" character varying, "status_detail" character varying, "transaction_amount" character varying, "items" character varying, "fee_mercadopago" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payments"`);
    }

}

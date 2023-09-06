import { MigrationInterface, QueryRunner } from "typeorm";

export class CreditQuota1693120067016 implements MigrationInterface {
    name = 'CreditQuota1693120067016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CreditQuota" ("id" SERIAL NOT NULL, "amount_assigned" double precision NOT NULL DEFAULT '0', "amount_available" double precision NOT NULL DEFAULT '0', "amount_utilized" double precision NOT NULL DEFAULT '0', "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_2ec33151c1fc78b38cfa395a88" UNIQUE ("userId"), CONSTRAINT "PK_6f34eac26372fc81cc75725b008" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "CreditQuota" ADD CONSTRAINT "FK_2ec33151c1fc78b38cfa395a885" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CreditQuota" DROP CONSTRAINT "FK_2ec33151c1fc78b38cfa395a885"`);
        await queryRunner.query(`DROP TABLE "CreditQuota"`);
    }

}

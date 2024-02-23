import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorEntities1693773074548 implements MigrationInterface {
    name = 'RefactorEntities1693773074548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credit" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "document" integer NOT NULL, "amount" double precision NOT NULL DEFAULT '0', "total_amount" double precision NOT NULL DEFAULT '0', "decision" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'Activo', "payment_date" character varying NOT NULL, "days_in_arrears" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c98add8e192ded18b69c3e345a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_9f5fdca6886a2ecdb6d34b23d70" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_9f5fdca6886a2ecdb6d34b23d70"`);
        await queryRunner.query(`DROP TABLE "credit"`);
    }

}

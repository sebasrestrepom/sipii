import { MigrationInterface, QueryRunner } from "typeorm";

export class CreditUserRelation1708031846383 implements MigrationInterface {
    name = 'CreditUserRelation1708031846383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_9f5fdca6886a2ecdb6d34b23d70"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_3544cc02a1d516135f1c265026f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_3544cc02a1d516135f1c265026f"`);
        await queryRunner.query(`ALTER TABLE "credit" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_9f5fdca6886a2ecdb6d34b23d70" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

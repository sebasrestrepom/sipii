import { MigrationInterface, QueryRunner } from "typeorm";

export class NewPhoneNumberType1692996166477 implements MigrationInterface {
    name = 'NewPhoneNumberType1692996166477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" integer NOT NULL`);
    }

}

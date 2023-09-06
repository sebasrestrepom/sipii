import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorUserEntity1694030209426 implements MigrationInterface {
    name = 'RefactorUserEntity1694030209426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "document_photo" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "selfie_photo" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "date_of_birth" date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "date_document_issuance" date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "marital_status" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "household_composition" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sons" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "economic_dependents" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "level_study" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "house_stratum" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "discovery_channel" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "occupation" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "job" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "years_experience" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "company_type" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "company_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "contract_type" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "monthly_income" double precision`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bank_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bank_account" bigint`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_validated" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_validated"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bank_account"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bank_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "monthly_income"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "contract_type"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "company_type"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "years_experience"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "job"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "occupation"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "discovery_channel"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "house_stratum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "level_study"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "economic_dependents"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sons"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "household_composition"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "marital_status"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_document_issuance"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "selfie_photo"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "document_photo"`);
    }

}

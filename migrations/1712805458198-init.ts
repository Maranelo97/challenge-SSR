import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712805458198 implements MigrationInterface {
    name = 'Init1712805458198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "currency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "capital" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "capital"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "name" character varying NOT NULL`);
    }

}

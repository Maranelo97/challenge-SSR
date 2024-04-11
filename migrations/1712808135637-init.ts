import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712808135637 implements MigrationInterface {
    name = 'Init1712808135637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "description" character varying, "sender_id" uuid, "receiver_id" uuid, "sender_account_id" uuid, "receiver_account_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_5007c936fb75048f7697ecb7eb0" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8dcd153bcbf943ac96288702e6f" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_ab04d6f62bdfac21c1e3c04a33d" FOREIGN KEY ("sender_account_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_55c3596e9965fdbbf0da0ff8c29" FOREIGN KEY ("receiver_account_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_55c3596e9965fdbbf0da0ff8c29"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_ab04d6f62bdfac21c1e3c04a33d"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8dcd153bcbf943ac96288702e6f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_5007c936fb75048f7697ecb7eb0"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}

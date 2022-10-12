import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665580800328 implements MigrationInterface {
    name = 'default1665580800328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "date" TIME WITH TIME ZONE NOT NULL`);
    }

}

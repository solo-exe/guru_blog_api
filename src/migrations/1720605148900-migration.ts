import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720605148900 implements MigrationInterface {
    name = 'Migration1720605148900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "text"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "body" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "body"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "text" character varying NOT NULL
        `);
    }

}

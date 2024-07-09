import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyForeignKey1720531898244 implements MigrationInterface {
    name = 'ModifyForeignKey1720531898244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_8eee23e5ccebd4025ecaccda1b2\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP COLUMN \`surveyId\``);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD \`surveyId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_8eee23e5ccebd4025ecaccda1b2\` FOREIGN KEY (\`surveyId\`) REFERENCES \`surveys\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_8eee23e5ccebd4025ecaccda1b2\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP COLUMN \`surveyId\``);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD \`surveyId\` varchar(36) NULL COMMENT 'アンケートID'`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_8eee23e5ccebd4025ecaccda1b2\` FOREIGN KEY (\`surveyId\`) REFERENCES \`surveys\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

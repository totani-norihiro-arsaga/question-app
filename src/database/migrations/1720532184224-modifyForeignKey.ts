import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyForeignKey1720532184224 implements MigrationInterface {
    name = 'ModifyForeignKey1720532184224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`choices\` DROP FOREIGN KEY \`FK_c5164e6bff485bcfafcac9703d3\``);
        await queryRunner.query(`ALTER TABLE \`choices\` CHANGE \`questionId\` \`questionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`choices\` ADD CONSTRAINT \`FK_c5164e6bff485bcfafcac9703d3\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`choices\` DROP FOREIGN KEY \`FK_c5164e6bff485bcfafcac9703d3\``);
        await queryRunner.query(`ALTER TABLE \`choices\` CHANGE \`questionId\` \`questionId\` int NULL COMMENT '質問ID'`);
        await queryRunner.query(`ALTER TABLE \`choices\` ADD CONSTRAINT \`FK_c5164e6bff485bcfafcac9703d3\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

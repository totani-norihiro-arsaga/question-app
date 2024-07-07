import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialization1720338286276 implements MigrationInterface {
    name = 'Initialization1720338286276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`multiple_choice_responses\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '回答ID', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`choiceId\` int NULL COMMENT '選択肢ID', \`questionId\` int NULL COMMENT '質問ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`choices\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '選択肢ID', \`choice_text\` varchar(255) NOT NULL COMMENT '選択肢文言', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionId\` int NULL COMMENT '質問ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '質問ID', \`question_text\` varchar(255) NOT NULL COMMENT '質問文', \`response_format\` int NOT NULL COMMENT '回答形式', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`surveyId\` varchar(36) NULL COMMENT 'アンケートID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`surveys\` (\`id\` varchar(36) NOT NULL COMMENT 'アンケートID', \`title\` varchar(255) NOT NULL COMMENT 'タイトル', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`multiple_choice_responses\` ADD CONSTRAINT \`FK_379dd0d39e6f58b80c827c45dcb\` FOREIGN KEY (\`choiceId\`) REFERENCES \`choices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`multiple_choice_responses\` ADD CONSTRAINT \`FK_509cc57cd17f8bd4be9682dcfb9\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`choices\` ADD CONSTRAINT \`FK_c5164e6bff485bcfafcac9703d3\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_8eee23e5ccebd4025ecaccda1b2\` FOREIGN KEY (\`surveyId\`) REFERENCES \`surveys\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_8eee23e5ccebd4025ecaccda1b2\``);
        await queryRunner.query(`ALTER TABLE \`choices\` DROP FOREIGN KEY \`FK_c5164e6bff485bcfafcac9703d3\``);
        await queryRunner.query(`ALTER TABLE \`multiple_choice_responses\` DROP FOREIGN KEY \`FK_509cc57cd17f8bd4be9682dcfb9\``);
        await queryRunner.query(`ALTER TABLE \`multiple_choice_responses\` DROP FOREIGN KEY \`FK_379dd0d39e6f58b80c827c45dcb\``);
        await queryRunner.query(`DROP TABLE \`surveys\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP TABLE \`choices\``);
        await queryRunner.query(`DROP TABLE \`multiple_choice_responses\``);
    }

}

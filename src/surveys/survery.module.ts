import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entities/survey.entity";
import { SurveyController } from './survey.controller';
import { SurveyService } from "./service/survey.service";
import { QuestionModule } from "src/questions/question.module";

@Module({
    imports: [TypeOrmModule.forFeature([Survey]), QuestionModule],
    controllers: [SurveyController],
    providers: [SurveyService],
})
export class SurveyMdule{}
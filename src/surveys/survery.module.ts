import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entities/survey.entity";
import { SurveyController } from './survey.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Survey])],
    controllers: [SurveyController],
})
export class SurveyMdule{}
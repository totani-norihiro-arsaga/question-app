import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from '../../../entities/survey.entity';
import { SurveyController } from './survey.controller';
import { SurveyService } from './service/survey.service';
import { AdminQuestionModule } from '../question/admin.question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Survey]), AdminQuestionModule],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class AdminSurveyMdule {}

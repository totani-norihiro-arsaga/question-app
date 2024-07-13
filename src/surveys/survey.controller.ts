import { Body, Controller, Post } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './service/survey.service';
import { QuestionService } from 'src/questions/services/question/question.service';
import { DataSource } from 'typeorm';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ValidationErrorResponse } from 'src/exception/dto/validation-error-response.dto';
import { CreatedSurveyResponseDto } from './dto/created-survey-response.dto';
import { InternalServerErrorResponse } from 'src/exception/dto/internal-server-error-response.dto';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
    private readonly dataSource: DataSource,
  ) {}

  @Post('create')
  @ApiOperation({ summary: '新しいアンケートを作成する。' })
  @ApiCreatedResponse({
    type: CreatedSurveyResponseDto,
    description: 'アンケート作成成功',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorResponse,
    description: 'バリデーションエラー',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: 'サーバーエラー',
  })
  async create(@Body() createSurveyDto: CreateSurveyDto): Promise<void | CreatedSurveyResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;
    try {
      const survey = await this.surveyService.create(createSurveyDto, manager);
      createSurveyDto.question.survey_id = survey.id;
      await this.questionService.create(createSurveyDto.question, manager);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return new CreatedSurveyResponseDto();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}

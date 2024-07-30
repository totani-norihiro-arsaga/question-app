import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { IndexSurveyDto } from './dto/index-survey.dto';
import { SurveyService } from './service/survey.service';
import { QuestionService } from 'src/modules/admin/question/services/question/question.service';
import { DataSource } from 'typeorm';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ValidationErrorResponse } from 'src/exception/dto/validation-error-response.dto';
import { CreatedSurveyResponseDto } from './dto/created-survey-response.dto';
import { InternalServerErrorResponse } from 'src/exception/dto/internal-server-error-response.dto';
import { Survey } from '../../../entities/survey.entity';
import { UUID } from 'crypto';
import { ShowSurveyResposeDto } from './dto/show-survey-response.dto';

@Controller('admin/survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
    private readonly dataSource: DataSource,
  ) {}

  @Get('index')
  @ApiOkResponse({ type: IndexSurveyDto })
  @ApiInternalServerErrorResponse({
    type: Array<Survey>,
    description: 'サーバーエラー',
  })
  async index(): Promise<Survey[]> {
    return await this.surveyService.getAll();
  }

  @ApiOkResponse({ type: ShowSurveyResposeDto })
  @Get(':id')
  async show(@Param('id') id: UUID): Promise<ShowSurveyResposeDto> {
    const survey = await this.surveyService.findById(id);
    const a = new ShowSurveyResposeDto(survey);
    return a;
  }

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
  async create(
    @Body() createSurveyDto: CreateSurveyDto,
  ): Promise<void | CreatedSurveyResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;
    try {
      const survey = await this.surveyService.create(createSurveyDto, manager);
      await this.questionService.create(createSurveyDto.questions, survey, manager);
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

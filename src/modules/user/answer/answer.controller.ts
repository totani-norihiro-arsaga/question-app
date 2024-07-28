import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { InternalServerErrorResponse } from 'src/exception/dto/internal-server-error-response.dto';
import { ValidationErrorResponse } from 'src/exception/dto/validation-error-response.dto';
import { CreateSurveyAnswerDto } from './dto/create-survey-answer.dto';
import { CreateAnswerResponseDto } from './dto/create-answer-response.dto';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'アンケートに対する回答を作成する。' })
  @ApiCreatedResponse({
    type: CreateAnswerResponseDto,
    description: '回答作成成功',
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
    @Body() createAnswerDto: CreateSurveyAnswerDto,
  ): Promise<CreateAnswerResponseDto> {
    try {
      await this.answerService.create(createAnswerDto);
      return new CreateAnswerResponseDto();
    } catch (error) {
      throw error;
    }
  }
}

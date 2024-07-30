import { Controller, Get, Param } from '@nestjs/common';
import { SurveyService } from './service/survey.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Survey } from '../../../entities/survey.entity';
import { UUID } from 'crypto';
import { InternalServerErrorResponse } from 'src/exception/dto/internal-server-error-response.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get(':id')
  @ApiOperation({ summary: 'アンケート回答画面' })
  @ApiOkResponse({
    type:Survey
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: 'サーバーエラー',
  })
  async index(@Param('id') id: UUID): Promise<Survey> {
    return await this.surveyService.findById(id);
  }
}

import { Controller, Get, Param} from '@nestjs/common';
import { SurveyService } from './service/survey.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Survey } from '../../surveys/entities/survey.entity';
import { UUID } from 'crypto';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @Get(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  async index(@Param('id') id: UUID):Promise<Survey> {
    return await this.surveyService.findById(id);
  }
}

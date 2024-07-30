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
    type:Survey,
    example: {
      "id": "e9b34941-f5b5-40d0-bdeb-03d871847075",
      "title": "好きなスポーツアンケート",
      "createdDate": "2024-07-30T00:34:51.068Z",
      "updatedDate": "2024-07-30T00:34:51.068Z",
      "questions": [
          {
              "id": 71,
              "questionText": "一番興味のあるオリンピック競技は？",
              "responseFormat": 1,
              "createdDate": "2024-07-30T00:34:51.081Z",
              "updatedDate": "2024-07-30T00:34:51.081Z",
              "surveyId": "e9b34941-f5b5-40d0-bdeb-03d871847075",
              "choices": [
                  {
                      "id": 43,
                      "choiceText": "サッカー",
                      "createdDate": "2024-07-30T00:34:51.088Z",
                      "updatedDate": "2024-07-30T00:34:51.088Z",
                      "questionId": 71
                  },
                  {
                      "id": 44,
                      "choiceText": "馬術",
                      "createdDate": "2024-07-30T00:34:51.094Z",
                      "updatedDate": "2024-07-30T00:34:51.094Z",
                      "questionId": 71
                  }
              ]
          }
      ]
  }
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: 'サーバーエラー',
  })
  async index(@Param('id') id: UUID): Promise<Survey> {
    return await this.surveyService.findById(id);
  }
}

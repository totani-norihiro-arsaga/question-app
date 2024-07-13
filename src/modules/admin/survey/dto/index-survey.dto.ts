import { ApiProperty } from '@nestjs/swagger';
import { Survey } from '../../../../entities/survey.entity';

export class IndexSurveyDto {
  @ApiProperty({
    type: Array<Survey>,
    example: [
      {
        id: '17e4a9cc-643d-4fb5-8b98-28b95734d740',
        title: 'dffggh',
        createdDate: '2024-07-14T17:33:33.458Z',
        updatedDate: '2024-07-14T17:33:33.458Z',
        questions: [
          {
            id: 44,
            questionText: 'ddd',
            responseFormat: 1,
            createdDate: '2024-07-14T17:33:33.480Z',
            updatedDate: '2024-07-14T17:33:33.480Z',
            surveyId: '17e4a9cc-643d-4fb5-8b98-28b95734d740',
            choices: [
              {
                id: 26,
                choiceText: 'テスト選択肢',
                createdDate: '2024-07-14T17:33:33.485Z',
                updatedDate: '2024-07-14T17:33:33.485Z',
                questionId: 44,
              },
              {
                id: 27,
                choiceText: 'テスト選択肢2',
                createdDate: '2024-07-14T17:33:33.485Z',
                updatedDate: '2024-07-14T17:33:33.485Z',
                questionId: 44,
              },
            ],
          },
        ],
      },
    ],
  })
  data: Survey[];
}

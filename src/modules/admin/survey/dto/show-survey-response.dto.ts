import { ApiProperty } from '@nestjs/swagger';
import { Survey } from '../../../../entities/survey.entity';
import { Choice } from 'src/entities/choice.entity';
import { Question } from 'src/entities/question.entity';
import { UUID } from 'crypto';

class ChoiceInSurveyDetail {
  public readonly choiceText: string;
  public readonly total_ansered_amount: number;

  constructor(choice: Choice) {
    this.choiceText = choice.choiceText;
    this.total_ansered_amount = choice.multipleChoiceResponses.length;
  }
}

class QuestionInSurveyDetail {
  public readonly questionText: string;
  public readonly choices: ChoiceInSurveyDetail[];

  constructor(question: Question) {
    this.questionText = question.questionText;
    this.choices = question.choices.map(
      (choice) => new ChoiceInSurveyDetail(choice),
    );
  }
}

class SurveyDetail {
  public readonly surveyId: UUID;
  public readonly surveyTitle: string;
  public readonly createdAt: Date;
  public readonly questions: QuestionInSurveyDetail[];

  constructor(survey: Survey) {
    this.surveyId = survey.id;
    this.surveyTitle = survey.title;
    this.createdAt = survey.createdDate;
    this.questions = survey.questions.map(
      (question) => new QuestionInSurveyDetail(question),
    );
  }
}

export class ShowSurveyResposeDto {
  @ApiProperty({
    type: SurveyDetail,
    example: {
      surveyId: '502de0f6-ec36-4690-8cfe-8071deeb9d4c',
      surveyTitle: '作成テスト',
      createdAt: '2024-07-30T23:39:12.366Z',
      questions: [
        {
          questionText: 'サッカーは好きですか',
          choices: [
            {
              choiceText: '好き',
              total_ansered_amount: 0,
            },
            {
              choiceText: '嫌い',
              total_ansered_amount: 0,
            },
            {
              choiceText: '関心が無い',
              total_ansered_amount: 0,
            },
          ],
        },
        {
          questionText: 'オリンピックは見ていますか？',
          choices: [
            {
              choiceText: '見ている',
              total_ansered_amount: 0,
            },
            {
              choiceText: '見ていない',
              total_ansered_amount: 0,
            },
            {
              choiceText: '関心がない',
              total_ansered_amount: 0,
            },
          ],
        },
      ],
    },
  })
  public survey: SurveyDetail;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  public total_answered_amount: number;
  constructor(survey: Survey) {
    this.total_answered_amount =
      survey.questions[0].multipleChoiceResponses.length;
    this.survey = new SurveyDetail(survey);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/modules/admin/question/dto/create-qustion.dto';
import { Choice } from 'src/entities/choice.entity';
import { Survey } from 'src/entities/survey.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Choice) private choiceRepository: Repository<Choice>,
  ) {}

  async create(
    createQuestionDtos: CreateQuestionDto[],
    survey: Survey,
    manager: EntityManager,
  ):Promise<void> {
    for (const createQuestionDto of createQuestionDtos) {
      const question = await manager.getRepository(Question).save({
        questionText: createQuestionDto.questionText,
        responseFormat: createQuestionDto.responseFormat,
        surveyId: survey.id,
      });

      const choices = createQuestionDto.choices.map((createChoiceDto) => {
        return {
          choiceText: createChoiceDto.choiceText,
          questionId: question.id,
        };
      });

      await manager.getRepository(Choice).save(choices);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyDto } from 'src/modules/admin/survey/dto/create-survey.dto';
import { UUID } from 'crypto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async getAll(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }

  async findById(id: UUID): Promise<Survey> {
    return await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.questions', 'questions')
      .leftJoinAndSelect('questions.choices', 'choices')
      .leftJoinAndSelect(
        'questions.multipleChoiceResponses',
        'multipleChoiceResponsesForQuestion',
      )
      .leftJoinAndSelect(
        'choices.multipleChoiceResponses',
        'multipleChoiceResponses',
      )
      .where('survey.id = :id', { id: id })
      .getOne();
  }

  async create(
    createSurveyDto: CreateSurveyDto,
    manager: EntityManager,
  ): Promise<Survey> {
    return await manager
      .getRepository(Survey)
      .save({ title: createSurveyDto.title });
  }
}

// {
//   title:string,
//   totalAnswerAmout:number,
//   questions:{
//     title:string,
//     choices:{
//       title:string,
//       answeredAmount: number,
//       multipleChoiceResponses:multipleChoiceResponse[]
//   }[]
// }

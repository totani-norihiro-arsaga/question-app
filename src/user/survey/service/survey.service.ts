import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async findById(id: UUID): Promise<Survey> {
    const survey = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.questions', 'questions')
      .leftJoinAndSelect('questions.choices', 'choices')
      .where('survey.id = :id', { id: id })
      .getOne();
    return survey;
  }
}

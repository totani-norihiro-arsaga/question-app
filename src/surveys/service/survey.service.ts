import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyDto } from '../dto/create-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async getAll(page:number, limit:number):Promise<[Survey[], number]>
  {
    return await this.surveyRepository.findAndCount({skip: page * limit, take:limit, relations:['questions', 'questions.choices']});
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

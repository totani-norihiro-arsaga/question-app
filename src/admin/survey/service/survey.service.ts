import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyDto } from 'src/surveys/dto/create-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async getAll():Promise<Survey[]>
  {
    return await this.surveyRepository.find();
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

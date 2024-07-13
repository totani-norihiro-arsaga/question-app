import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyDto } from 'src/modules/admin/survey/dto/create-survey.dto';

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

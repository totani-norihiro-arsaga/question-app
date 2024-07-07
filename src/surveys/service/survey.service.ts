import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../entities/survey.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from '../dto/create-survey.dto';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(Survey) private surveyRepository:Repository<Survey>
    )
    {}
    
    async create(createSurveyDto:CreateSurveyDto):Promise<Survey> {
        return await this.surveyRepository.save({title:createSurveyDto.title})
        .catch((e) => {
            throw new InternalServerErrorException(`[${e.message}]:保存に失敗しました。`);
        });
    }
}

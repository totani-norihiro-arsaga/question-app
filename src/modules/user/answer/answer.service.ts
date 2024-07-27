import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultipleChoiceResponse } from 'src/entities/multiple-choice-response.entity';
import { Repository } from 'typeorm';
import { CreateSurveyAnswerDto } from './dto/create-survey-answer.dto';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(MultipleChoiceResponse)
        private multipleChoiceResponseRepository: Repository<MultipleChoiceResponse>,
    ){}

    async create(
        createAnswerDto: CreateSurveyAnswerDto,
    )
    {
        const answers = Object.keys(createAnswerDto.contens).map(key => {
            return {
                choiceId: createAnswerDto.contens[key] as number,
                questionId: parseInt(key)
            }
        })
        return await this.multipleChoiceResponseRepository
        .save(answers);
    }
}

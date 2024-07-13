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
        return await this.multipleChoiceResponseRepository
        .save({
            choiceId: createAnswerDto.answer.content,
            questionId: createAnswerDto.answer.questionId,
        });
    }
}

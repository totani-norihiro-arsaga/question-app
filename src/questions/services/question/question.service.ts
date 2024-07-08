import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/questions/dto/create-qustion.dto';
import { Choice } from 'src/questions/entities/choice.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(Choice) private choiceRepository: Repository<Choice>
    ){}

    async create(createQuestionDto: CreateQuestionDto) {
        createQuestionDto
        let question = await this.questionRepository.save(
            {
                question_text: createQuestionDto.qustion_text,
                response_format: createQuestionDto.response_format,
                Survey_id: createQuestionDto.survey_id,
            }
        )

    createQuestionDto.choice.question_id = question.id;

        return await this.choiceRepository.save(
            {
                choice_text: createQuestionDto.choice.choice_text,
                question_id: createQuestionDto.choice.question_id,
            }
        )
    }
}

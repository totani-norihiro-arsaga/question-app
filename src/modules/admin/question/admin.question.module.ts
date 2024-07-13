import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Choice } from 'src/entities/choice.entity';
import { MultipleChoiceResponse } from 'src/entities/multiple-choice-response.entity';
import { QuestionService } from './services/question/question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Choice, MultipleChoiceResponse]),
  ],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class AdminQuestionModule {}

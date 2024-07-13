import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { Choice } from 'src/questions/entities/choice.entity';
import { MultipleChoiceResponse } from 'src/questions/entities/multiple-choice-response.entity';
import { QuestionService } from './services/question/question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Choice, MultipleChoiceResponse]),
  ],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class AdminQuestionModule {}

import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultipleChoiceResponse } from 'src/entities/multiple-choice-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MultipleChoiceResponse])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}

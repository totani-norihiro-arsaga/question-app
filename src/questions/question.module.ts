import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { Choice } from "./entities/choice.entity";
import { MultipleChoiceResponse } from "./entities/multiple-choice-response.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Question, Choice, MultipleChoiceResponse])],
})
export class QuestionModule{}
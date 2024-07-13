import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { CreateQuestionAnswerDto } from "./create-question-answer.dto";

export class CreateSurveyAnswerDto {

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        type: 'string',
        example: 'ddf04cad-f738-4b85-bd80-2810e96a8b29',
        description: 'アンケートID',
    })
    surveyId: UUID;

    @IsNotEmpty()
    @Type(()=>CreateQuestionAnswerDto)
    @ApiProperty({
        type: CreateQuestionAnswerDto,
        example: {questionId:1, content:2},
        description: 'アンケートの質問と回答のセット'
    })
    answer: CreateQuestionAnswerDto;
}
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";

class SurveyAnswerContent {
    [key: number]: number;
}

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
    @Type(()=>SurveyAnswerContent)
    @ApiProperty({
        type: SurveyAnswerContent,
        example: {29:1, 31:2},
        description: 'アンケートの質問と回答のセット'
    })
    contens: SurveyAnswerContent;
}
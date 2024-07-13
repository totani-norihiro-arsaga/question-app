import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateQuestionAnswerDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type:'number',
        example: 1,
        description: '回答対象の質問'
    })
    questionId: number;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type:'number',
        example: 3,
        description: '回答内容'
    })
    content: number;
}
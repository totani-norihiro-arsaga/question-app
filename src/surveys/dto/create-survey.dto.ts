import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "src/questions/dto/create-qustion.dto";

export class CreateSurveyDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @ValidateNested()
    @Type(() => CreateQuestionDto)
    question: CreateQuestionDto;
}
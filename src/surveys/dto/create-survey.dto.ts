import { IsNotEmpty, IsString } from "class-validator";

export class CreateSurveyDto{
    @IsString()
    @IsNotEmpty()
    title: string;
}
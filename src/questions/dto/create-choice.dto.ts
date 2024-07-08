import { IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateChoiceDto{
    @IsString()
    @IsNotEmpty()
    choice_text: string;

    @IsOptional()
    @IsNumber()
    question_id:number | null;
}
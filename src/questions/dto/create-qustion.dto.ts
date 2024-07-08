import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested} from "class-validator";
import { ResponseTypes } from "../ enums/ResponseTypes";
import { CreateChoiceDto } from "./create-choice.dto";
import { Type } from "class-transformer";
import { UUID } from "crypto";

export class CreateQuestionDto{
    @IsString()
    @IsNotEmpty()
    qustion_text: string;

    @IsEnum(ResponseTypes)
    response_format:ResponseTypes

    @ValidateNested()
    @Type(() => CreateChoiceDto)
    choice:CreateChoiceDto

    @IsOptional()
    @IsUUID()
    survey_id:UUID | null

}
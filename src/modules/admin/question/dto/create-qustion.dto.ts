import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ResponseTypes } from '../../../../ enums/ResponseTypes';
import { CreateChoiceDto } from './create-choice.dto';
import { Type } from 'class-transformer';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '一番好きなお肉の種類は？',
    description: '質問文',
  })
  questionText: string;

  @IsEnum(ResponseTypes)
  @ApiProperty({
    enum: ResponseTypes,
    example: ResponseTypes.SingleChoice,
    description: '質問への回答形式',
  })
  responseFormat: ResponseTypes;

  @ValidateNested({each:true})
  @Type(() => Array<CreateChoiceDto>)
  @ArrayMinSize(2)
  @ApiProperty({
    type: Array<CreateChoiceDto>,
    description: '質問に対する選択肢',
  })
  choices: CreateChoiceDto[];

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: 'ddf04cad-f738-4b85-bd80-2810e96a8b29',
    description: 'アンケートID',
  })
  surveyId: UUID | null;
}

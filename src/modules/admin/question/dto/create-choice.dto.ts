import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChoiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'ひつじ',
    description: '質問に対する選択肢',
  })
  choiceText: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number', example: 3, description: '質問ID' })
  questionId: number | null;
}

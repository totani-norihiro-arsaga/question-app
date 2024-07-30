import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from 'src/modules/admin/question/dto/create-qustion.dto';

export class CreateSurveyDto {
  // @IsString()
  // @IsNotEmpty({})
  @ApiProperty({
    type: 'strng',
    example: '好きな食べ物に関するアンケート',
    description: 'アンケートの名前',
  })
  title: string;

  @ValidateNested({each:true})
  @Type(() => Array<CreateQuestionDto>)
  // @ArrayNotEmpty()
  @ApiProperty({ type: Array<CreateQuestionDto>, description: '具体的な質問内容' })
  questions: CreateQuestionDto[];
}

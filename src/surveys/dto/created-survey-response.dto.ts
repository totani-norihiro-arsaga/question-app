import { ApiProperty } from '@nestjs/swagger';

export class CreatedSurveyResponseDto {
  @ApiProperty({
    type: 'strng',
    example: '作成成功しました。',
    default: '作成成功しました。',
  })
  message: '作成成功しました。';
}

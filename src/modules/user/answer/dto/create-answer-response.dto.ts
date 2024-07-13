import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerResponseDto {
  @ApiProperty({
    type: 'strng',
    example: '作成成功しました。',
    default: '作成成功しました。',
  })
  message: '作成成功しました。';

  constructor() {
    this.message = '作成成功しました。';
  }
}

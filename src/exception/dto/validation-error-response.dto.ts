import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponse {
  @ApiProperty({ type: Number, example: 400 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'Bad Request' })
  error: string;

  @ApiProperty({ type: Array<String>, example: 'タイトルは必須です。' })
  message: string[];
}

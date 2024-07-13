import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponse {
  @ApiProperty({ type: Number, example: 500 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'Internal Server Error' })
  error: string;

  @ApiProperty({ type: String, example: '何かがおかしいようです。' })
  message: string;
}

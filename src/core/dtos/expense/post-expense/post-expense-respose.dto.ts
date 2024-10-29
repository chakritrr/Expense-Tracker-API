import { ApiProperty } from '@nestjs/swagger';

export class PostExpenseResponseDto {
  @ApiProperty()
  id: string;
}

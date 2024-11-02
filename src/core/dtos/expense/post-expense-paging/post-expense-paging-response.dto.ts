import { ApiProperty } from '@nestjs/swagger';

export class PostExpensePagingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  user_id: string;
}

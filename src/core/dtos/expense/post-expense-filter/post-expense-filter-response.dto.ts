import { ApiProperty } from '@nestjs/swagger';

export class PostExpenseFilterResponseDto {
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
}

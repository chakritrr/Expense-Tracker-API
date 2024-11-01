import { ApiProperty } from '@nestjs/swagger';

export class PostExpenseReportListResponseDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  count: number;
}

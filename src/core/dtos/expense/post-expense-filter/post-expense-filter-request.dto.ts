import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PostExpenseFilterRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  endDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;
}

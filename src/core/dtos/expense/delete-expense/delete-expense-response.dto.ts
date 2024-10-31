import { ApiProperty } from '@nestjs/swagger';

export class DeleteExpenseResponseDto {
  @ApiProperty()
  id: string;
}

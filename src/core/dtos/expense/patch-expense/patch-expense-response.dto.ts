import { ApiProperty } from '@nestjs/swagger';

export class PatchExpenseResponseDto {
  @ApiProperty()
  id: string;
}

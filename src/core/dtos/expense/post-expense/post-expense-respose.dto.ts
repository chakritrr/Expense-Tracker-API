import { ApiProperty } from '@nestjs/swagger';

export class PostExpenseResponserDto {
  @ApiProperty()
  id: string;
}

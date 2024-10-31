import { Injectable } from '@nestjs/common';

import { DeleteExpenseResponseDto } from 'src/core';

@Injectable()
export class ExpenseDeleteFactoryService {
  constructResponse(id: string) {
    const resp = new DeleteExpenseResponseDto();
    resp.id = id;

    return resp;
  }
}

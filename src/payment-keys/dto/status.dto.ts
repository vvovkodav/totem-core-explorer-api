import { ApiProperty } from '@nestjs/swagger';

export class PaymentKeysStatusResponseDto {
  @ApiProperty({ description: 'amount of the payment keys' })
  amount: number;
}

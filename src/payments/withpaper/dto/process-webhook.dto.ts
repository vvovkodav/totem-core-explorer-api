import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessWebhookRequestDto {
  @ApiProperty({ description: 'order id', required: true })
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'webhook event', required: true })
  @IsNotEmpty()
  event: string;

  @ApiProperty({ description: 'transaction hash' })
  @IsString()
  txHash: string;
}

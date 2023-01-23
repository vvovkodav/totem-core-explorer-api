import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber } from 'class-validator';

export class CreateApiKeysRequestDto {
  @ApiProperty({ enum: [10, 50, 100], description: 'api keys amount', required: true })
  @IsIn([10, 50, 100])
  @IsNumber()
  amount: number;
}

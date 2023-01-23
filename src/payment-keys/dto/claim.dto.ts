import { ApiProperty } from '@nestjs/swagger';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';
import { IsNotEmpty } from 'class-validator';

export class ClaimApiKeyRequestDto {
  @ApiProperty({ description: 'player address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  playerAddress: string;
}

export class ClaimApiKeyResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

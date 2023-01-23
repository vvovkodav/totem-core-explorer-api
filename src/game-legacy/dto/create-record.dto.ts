import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class CreateGameLegacyRequestDto {
  @ApiProperty({ description: 'game address' })
  @IsValidAddress()
  @IsNotEmpty()
  gameAddress: string;

  @ApiProperty({ description: 'schemaless legacy record data' })
  @IsString()
  @IsNotEmpty()
  data: string;
}

export class CreateGameLegacyResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

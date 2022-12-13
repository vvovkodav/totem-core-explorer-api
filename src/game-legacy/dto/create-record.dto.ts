import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsBigNumber } from '../../utils/validations/IsBigNumber';

export class CreateGameLegacyRequestDto {
  @ApiProperty({ description: 'BigNumber contract game index' })
  @IsBigNumber()
  @IsNotEmpty()
  gameId: string;

  @ApiProperty({ description: 'schemaless legacy record data' })
  @IsString()
  @IsNotEmpty()
  data: string;
}

export class CreateGameLegacyResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsBigNumber } from '../../utils/validations/IsBigNumber';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class CreateAssetRecordRequestDto {
  @ApiProperty({ description: 'player address' })
  @IsValidAddress()
  @IsNotEmpty()
  playerAddress: string;

  @ApiProperty({ description: 'BigNumber contract asset index' })
  @IsBigNumber()
  @IsNotEmpty()
  assetId: string;

  @ApiProperty({ description: 'BigNumber contract game index' })
  @IsBigNumber()
  @IsNotEmpty()
  gameId: string;

  @ApiProperty({ description: 'schemaless legacy record data' })
  @IsString()
  @IsNotEmpty()
  data: string;
}

export class CreateAssetRecordResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

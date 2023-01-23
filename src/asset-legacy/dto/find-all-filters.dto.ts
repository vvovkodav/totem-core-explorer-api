import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { IsBigNumber } from '../../utils/validations/IsBigNumber';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class FindAllFiltersDto {
  @ApiProperty({ description: 'player address', required: false })
  @IsValidAddress()
  @IsOptional()
  playerAddress?: string;

  @ApiProperty({ description: 'BigNumber contract asset index', required: false })
  @IsBigNumber()
  @IsOptional()
  assetId: string;

  @ApiProperty({ description: 'game address', required: false })
  @IsValidAddress()
  @IsOptional()
  gameAddress: string;

  @ApiProperty({ enum: [5, 10, 20], required: true, default: 10 })
  @IsIn(['5', '10', '20'])
  @IsNumberString()
  limit: string;

  @ApiProperty({ required: true, default: 0 })
  @IsNumberString()
  offset: string;
}

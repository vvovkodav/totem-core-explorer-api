import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class CreateGameRequestDto {
  @ApiProperty({ description: 'game address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  gameAddress: string;

  @ApiProperty({ description: 'owner address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  ownerAddress: string;

  @ApiProperty({ description: 'game name', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'author name', required: true })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'renderer url', required: false })
  @IsString()
  renderer: string;

  @ApiProperty({ description: 'avatar filter', required: false })
  @IsString()
  avatarFilter: string;

  @ApiProperty({ description: 'asset filter', required: false })
  @IsString()
  itemFilter: string;

  @ApiProperty({ description: 'gem filter', required: false })
  @IsString()
  gemFilter: string;

  @ApiProperty({ description: 'website url', required: false })
  @IsString()
  website: string;
}

export class CreateGameResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

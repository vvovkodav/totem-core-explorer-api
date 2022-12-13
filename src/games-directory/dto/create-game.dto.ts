import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class CreateGameRequestDto {
  @ApiProperty({ description: 'owner address' })
  @IsValidAddress()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ description: 'game name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'author name' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'renderer url' })
  @IsString()
  @IsNotEmpty()
  renderer: string;

  @ApiProperty({ description: 'avatar filter' })
  @IsString()
  @IsNotEmpty()
  avatarFilter: string;

  @ApiProperty({ description: 'asset filter' })
  @IsString()
  @IsNotEmpty()
  assetFilter: string;

  @ApiProperty({ description: 'gem filter' })
  @IsString()
  @IsNotEmpty()
  gemFilter: string;

  @ApiProperty({ description: 'website url' })
  @IsString()
  @IsNotEmpty()
  website: string;
}

export class CreateGameResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

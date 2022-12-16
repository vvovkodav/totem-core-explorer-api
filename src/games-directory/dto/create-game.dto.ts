import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class CreateGameRequestDto {
  @ApiProperty({ description: 'owner address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  owner: string;

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
  @IsOptional()
  renderer: string;

  @ApiProperty({ description: 'avatar filter', required: false })
  @IsString()
  @IsOptional()
  avatarFilter: string;

  @ApiProperty({ description: 'asset filter', required: false })
  @IsString()
  @IsOptional()
  itemFilter: string;

  @ApiProperty({ description: 'gem filter', required: false })
  @IsString()
  @IsOptional()
  gemFilter: string;

  @ApiProperty({ description: 'website url', required: false })
  @IsString()
  @IsOptional()
  website: string;
}

export class CreateGameResponseDto {
  @ApiProperty({ description: 'transaction hash' })
  txHash: string;
}

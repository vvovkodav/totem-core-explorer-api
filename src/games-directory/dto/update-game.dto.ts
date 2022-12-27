import { ApiProperty } from '@nestjs/swagger';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GameStatus } from '../../utils/enums';

export class UpdateGameRequestDto {
  @ApiProperty({ description: 'owner address', required: false })
  @IsValidAddress()
  @IsOptional()
  owner?: string;

  @ApiProperty({ description: 'game name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'author name', required: false })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ description: 'renderer url', required: false })
  @IsString()
  @IsOptional()
  renderer?: string;

  @ApiProperty({ description: 'avatar filter', required: false })
  @IsString()
  @IsOptional()
  avatarFilter?: string;

  @ApiProperty({ description: 'asset filter', required: false })
  @IsString()
  @IsOptional()
  itemFilter?: string;

  @ApiProperty({ description: 'gem filter', required: false })
  @IsString()
  @IsOptional()
  gemFilter?: string;

  @ApiProperty({ description: 'website url', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({
    enum: [GameStatus.Pending, GameStatus.Accepted, GameStatus.Rejected, GameStatus.Banned],
    description: '0 - Pending, 1 - Accepted, 2 - Rejected, 3 - Banned',
    required: false,
  })
  @IsEnum(GameStatus)
  @IsOptional()
  status?: GameStatus;
}

export class UpdateGameResponseDto {
  @ApiProperty({ description: 'change owner transaction hash', required: false })
  ownerTxHash?: string;

  @ApiProperty({ description: 'change name transaction hash', required: false })
  nameTxHash?: string;

  @ApiProperty({ description: 'change author transaction hash', required: false })
  authorTxHash?: string;

  @ApiProperty({ description: 'change renderer transaction hash', required: false })
  rendererTxHash?: string;

  @ApiProperty({ description: 'change avatarFilter transaction hash', required: false })
  avatarFilterTxHash?: string;

  @ApiProperty({ description: 'change itemFilter transaction hash', required: false })
  itemFilterTxHash?: string;

  @ApiProperty({ description: 'change gemFilter transaction hash', required: false })
  gemFilterTxHash?: string;

  @ApiProperty({ description: 'change website transaction hash', required: false })
  websiteTxHash?: string;

  @ApiProperty({ description: 'change status transaction hash', required: false })
  statusTxHash?: string;
}

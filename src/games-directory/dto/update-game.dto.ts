import { ApiProperty } from '@nestjs/swagger';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { GameStatus } from '../../utils/enums';

export class UpdateGameRequestDto {
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

  @ApiProperty({
    enum: [GameStatus.Pending, GameStatus.Accepted, GameStatus.Rejected, GameStatus.Banned],
    description: '1 - Pending, 2 - Accepted, 3 - Rejected, 4 - Banned',
    required: false,
  })
  @IsEnum(GameStatus)
  status: GameStatus;
}

export class UpdateGameResponseDto {
  @ApiProperty({ description: 'update transaction hash' })
  txHash: string;
}

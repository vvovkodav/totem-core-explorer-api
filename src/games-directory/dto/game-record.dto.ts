import { ApiProperty } from '@nestjs/swagger';

import { GameStatus } from '../../utils/enums';

export class GameRecordDto {
  @ApiProperty({ description: 'contract record index' })
  recordId: string;

  @ApiProperty({ description: 'owner address' })
  owner: string;

  @ApiProperty({ description: 'game name' })
  name: string;

  @ApiProperty({ description: 'author name' })
  author: string;

  @ApiProperty({ description: 'renderer url' })
  renderer: string;

  @ApiProperty({ description: 'avatar filter url' })
  avatarFilter: string;

  @ApiProperty({ description: 'asset filter url' })
  assetFilter: string;

  @ApiProperty({ description: 'gem filter' })
  gemFilter: string;

  @ApiProperty({ description: 'website url' })
  website: string;

  @ApiProperty({ description: 'created at timestamp in seconds' })
  createdAt: number;

  @ApiProperty({ description: 'updated at timestamp in seconds' })
  updatedAt: number;

  @ApiProperty({ enum: GameStatus, description: 'game status', example: GameStatus.PENDING })
  status: number;
}

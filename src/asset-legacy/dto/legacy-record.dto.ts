import { ApiProperty } from '@nestjs/swagger';

export class AssetLegacyRecordDto {
  @ApiProperty()
  assetId: string;

  @ApiProperty()
  gameAddress: string;

  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  data: string;
}

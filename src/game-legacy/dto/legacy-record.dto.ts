import { ApiProperty } from '@nestjs/swagger';

export class GameLegacyRecordDto {
  @ApiProperty({ description: 'contract record index' })
  recordId: string;

  @ApiProperty({ description: 'BigNumber contract game index' })
  gameId: string;

  @ApiProperty({ description: 'created at block timestamp in seconds' })
  timestamp: number;

  @ApiProperty({ description: 'schemaless legacy record data' })
  data: string;
}

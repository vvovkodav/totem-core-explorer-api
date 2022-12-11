import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsBigNumber } from '../../utils/validations/IsBigNumber';

export class CreateGameRecordDto {
  @ApiProperty({ description: 'BigNumber contract game index' })
  @IsBigNumber()
  @IsNotEmpty()
  gameId: string;

  @ApiProperty({ description: 'schemaless legacy record data' })
  @IsString()
  @IsNotEmpty()
  data: string;
}

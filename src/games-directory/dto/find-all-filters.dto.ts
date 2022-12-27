import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumberString, IsOptional } from 'class-validator';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';
import { GameStatus } from '../../utils/enums';

export class FindAllFiltersDto {
  @ApiProperty({ description: 'game owner address', required: false })
  @IsValidAddress()
  @IsOptional()
  owner?: string;

  @ApiProperty({
    enum: [GameStatus.Pending, GameStatus.Accepted, GameStatus.Rejected, GameStatus.Banned],
    description: '0 - Pending, 1 - Accepted, 2 - Rejected, 3 - Banned',
    required: false,
  })
  @Transform(({ value }) => (value ? parseInt(value, 10) : value))
  @IsEnum(GameStatus)
  @IsOptional()
  status?: GameStatus;

  @ApiProperty({ enum: [5, 10, 20], required: true, default: 10 })
  @IsIn(['5', '10', '20'])
  @IsNumberString()
  limit: string;

  @ApiProperty({ required: true, default: 0 })
  @IsNumberString()
  offset: string;
}

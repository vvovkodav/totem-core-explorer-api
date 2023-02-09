import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class ClaimAssetsRequestDTO {
  @ApiProperty({ description: 'owner address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  ownerAddress: string;
}

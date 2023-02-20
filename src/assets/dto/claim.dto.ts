import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class ClaimRequestDTO {
  @ApiProperty({ description: 'owner address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  ownerAddress: string;
}

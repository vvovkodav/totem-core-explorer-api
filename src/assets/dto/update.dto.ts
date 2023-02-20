import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class UpdateAssetDTO {
  @ApiProperty({ description: 'ERC721 asset contract address', required: false })
  @IsValidAddress()
  @IsNotEmpty()
  contractAddress?: string;

  @ApiProperty({ description: 'asset price in USDC', required: false })
  @IsNumberString()
  price?: string;
}

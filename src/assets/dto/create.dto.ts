import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { IsValidAddress } from '../../utils/validations/IsValidAddress';

export class CreateAssetDTO {
  @ApiProperty({ description: 'ERC721 asset contract address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  contractAddress: string;

  @ApiProperty({ description: 'asset price in USDC', required: true })
  @IsNumberString()
  price: string;
}

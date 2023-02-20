import { ApiProperty } from '@nestjs/swagger';

export class AssetInfoDTO {
  @ApiProperty({ description: 'ERC721 asset contract address' })
  contractAddress: string;

  @ApiProperty({ description: 'asset price in USDC' })
  price: string;
}

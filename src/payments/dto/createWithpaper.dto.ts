import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidAddress } from 'src/utils/validations/IsValidAddress';

export class CreateWithpaperPaymentLinkRequestDto {
  @ApiProperty({ description: 'owner address', required: true })
  @IsValidAddress()
  @IsNotEmpty()
  ownerAddress: string;

  @ApiProperty({
    description: 'the address to which the client will be redirected after successful payment',
    required: false,
  })
  successUrl: string;
}

export class CreateWithpaperPaymentLinkResponseDto {
  @ApiProperty({ description: 'created order id' })
  orderId: string;

  @ApiProperty({ description: 'link to pay with "Withpaper"' })
  url: string;
}

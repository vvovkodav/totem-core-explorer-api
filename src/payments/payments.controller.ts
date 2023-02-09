import { Body, Controller, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetTypePipe } from '../utils/pipes';
import { AssetType } from '../utils/enums';
import { PaymentsService } from './payments.service';
import { CreateWithpaperPaymentLinkRequestDto, CreateWithpaperPaymentLinkResponseDto } from './dto/createWithpaper.dto';

@ApiTags('Payments')
@Controller('payment')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post('link/withpaper/:assetType')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Authorization token' })
  @ApiResponse({
    status: 200,
    description: 'API returns oder id and url for payment',
    type: CreateWithpaperPaymentLinkResponseDto,
  })
  @ApiOperation({ summary: 'API for creating an order and a payment link for buying an asset' })
  async createWithpaperPaymentLink(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) body: CreateWithpaperPaymentLinkRequestDto,
  ) {
    return await this.service.createWithpaperPaymentLink(assetType, body.ownerAddress, body.successUrl);
  }

  // @Post('webhook/:paymentSystem')
  // @ApiResponse({
  //   status: 200,
  //   description: 'API returns oder id and url for payment',
  //   type: Boolean,
  // })
  // @ApiOperation({ summary: 'API for process webhooks' })
  // async webhook(@Param('paymentSystem') paymentSystem: PaymentSystem, @Body() body): Promise<boolean> {
  //   if (paymentSystem === 'stripe') {
  //     this.service.stripeWebhook(body);
  //   } else if (paymentSystem === 'withpaper') {
  //     this.service.withpaperWebhook(body);
  //   }
  //   return true;
  // }
}

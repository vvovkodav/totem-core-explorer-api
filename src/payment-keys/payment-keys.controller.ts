import { Body, Controller, Get, Param, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { PaymentKeysService } from './payment-keys.service';
import { AssetTypePipe, PaymentKeysPipe } from '../utils/pipes';
import { AssetType, PaymentKeyStatus } from '../utils/enums';
import { UnhandledExceptionFilter } from '../utils/filters';
import { CreateApiKeysRequestDto } from './dto/create.dto';
import { ClaimApiKeyRequestDto, ClaimApiKeyResponseDto } from './dto/claim.dto';
import { PaymentKeysStatusResponseDto } from './dto/status.dto';

@ApiTags('Payment Keys')
@ApiExtraModels(CreateApiKeysRequestDto)
@ApiExtraModels(ClaimApiKeyRequestDto)
@ApiExtraModels(ClaimApiKeyResponseDto)
@ApiExtraModels(PaymentKeysStatusResponseDto)
@Controller('payment-keys')
@UseFilters(new UnhandledExceptionFilter())
export class PaymentKeysController {
  constructor(private service: PaymentKeysService) {}

  @Post(':assetType')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiQuery({ name: 'apiKey', description: 'publisher api key', required: true })
  @ApiCreatedResponse({ description: 'Created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Query('apiKey') apiKey: string,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: CreateApiKeysRequestDto,
  ) {
    return await this.service.create(assetType, apiKey, request.amount);
  }

  @Post(':assetType/claim')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiQuery({ name: 'apiKey', description: 'publisher api key', required: true })
  @ApiOkResponse({ description: 'Claimed successfully', schema: { $ref: getSchemaPath(ClaimApiKeyResponseDto) } })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiNotFoundResponse({ description: 'Api key not found' })
  async claim(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Query('apiKey') apiKey: string,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: ClaimApiKeyRequestDto,
  ) {
    return await this.service.claim(assetType, apiKey, request.playerAddress);
  }

  @Get(':assetType')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiQuery({ name: 'apiKey', description: 'publisher api key', required: true })
  @ApiQuery({
    name: 'status',
    description: 'payment key status',
    required: true,
    enum: ['reserved', 'inTransaction', 'claimed'],
  })
  @ApiOkResponse({
    description: 'Payment keys amount with requested status',
    schema: { $ref: getSchemaPath(PaymentKeysStatusResponseDto) },
  })
  async status(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Query('apiKey') apiKey: string,
    @Query('status', new PaymentKeysPipe()) status: PaymentKeyStatus,
  ) {
    return await this.service.status(assetType, apiKey, status);
  }
}

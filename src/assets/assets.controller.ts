import { Body, Controller, Get, Param, Patch, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetsService } from '../explorer-backend/assets/assets.service';
import { UnhandledExceptionFilter } from '../utils/filters';
import { AssetTypePipe } from '../utils/pipes';
import { AssetType } from '../utils/enums';
import { ClaimRequestDTO } from './dto/claim.dto';
import { CreateAssetDTO } from './dto/create.dto';
import { UpdateAssetDTO } from './dto/update.dto';
import { AssetInfoDTO } from './dto/info.dto';

@ApiTags('Assets')
@Controller('assets')
@UseFilters(new UnhandledExceptionFilter())
export class AssetsController {
  constructor(private readonly service: AssetsService) {}

  @Post(':assetType')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiResponse({ status: 201, description: 'Asset created successfully' })
  @ApiOperation({ summary: 'Create new asset' })
  async create(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) body: CreateAssetDTO,
  ) {
    return await this.service.create({ assetType, ...body });
  }

  @Patch(':assetType')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiResponse({
    status: 200,
    description: 'Asset updated successfully',
  })
  @ApiOperation({ summary: 'Update asset info' })
  async update(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) body: UpdateAssetDTO,
  ) {
    return await this.service.update({ assetType, ...body });
  }

  @Get(':assetType')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiResponse({
    status: 200,
    description: 'Asset info',
    type: AssetInfoDTO,
  })
  @ApiOperation({ summary: 'Get asset info' })
  async info(@Param('assetType', new AssetTypePipe()) assetType: AssetType) {
    return await this.service.info({ assetType });
  }

  @Post(':assetType/claim')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiResponse({
    status: 200,
    description: 'Assets minted successfully',
  })
  @ApiOperation({ summary: 'API for mint first assets for user' })
  async claim(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) body: ClaimRequestDTO,
  ) {
    return await this.service.claim({
      assetType,
      ownerAddress: body.ownerAddress,
    });
  }
}

import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetType } from '../utils/enums';
import { AssetTypePipe } from '../utils/pipes';
import { ClaimAssetsRequestDTO } from './dto/assets.dto';
import { AssetsService } from './assets.service';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly service: AssetsService) {}

  @Post(':assetType/claim')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiResponse({
    status: 200,
    description: 'Assets minted successfully',
  })
  @ApiOperation({ summary: 'API for mint first assets for user' })
  async claimAssets(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) body: ClaimAssetsRequestDTO,
  ) {
    return await this.service.claimAssets(body.ownerAddress, assetType);
  }
}

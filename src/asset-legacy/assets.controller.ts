import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { CreateAssetRecordRequestDto, CreateAssetRecordResponseDto } from './dto/create-record.dto';
import { AssetLegacyRecordDto } from './dto/legacy-record.dto';
import { ApiPaginatedResponse, PaginatedDto } from '../utils/dto/paginated.dto';
import { AssetType } from '../utils/enums';
import { AssetTypePipe } from '../utils/pipes/asset-type.pipe';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';

@ApiTags('Assets Legacy')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(AssetLegacyRecordDto)
@ApiExtraModels(CreateAssetRecordResponseDto)
@Controller('asset-legacy')
export class AssetsController {
  constructor(private service: AssetsService) {}

  @Post(':assetType')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: { $ref: getSchemaPath(CreateAssetRecordResponseDto) },
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) createRecordDto: CreateAssetRecordRequestDto,
  ): Promise<CreateAssetRecordResponseDto> {
    return await this.service.create(assetType, createRecordDto);
  }

  @Get(':assetType')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiPaginatedResponse(AssetLegacyRecordDto, {
    description: 'Paginated list of the asset legacy records',
  })
  async findAll(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Query(new ValidationPipe({ transform: true, stopAtFirstError: true })) filters: FindAllFiltersDto,
  ): Promise<PaginatedDto<AssetLegacyRecordDto>> {
    return await this.service.findAll(assetType, filters);
  }

  @Get(':assetType/:id')
  @ApiParam({ name: 'assetType', enum: ['avatar', 'item', 'gem'] })
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(AssetLegacyRecordDto) },
    description: 'Asset legacy record',
  })
  async findById(
    @Param('assetType', new AssetTypePipe()) assetType: AssetType,
    @Param('id') id: string,
  ): Promise<AssetLegacyRecordDto> {
    return await this.service.findById(assetType, id);
  }
}

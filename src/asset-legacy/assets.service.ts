import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Long } from '@grpc/proto-loader';

import { CreateAssetRecordRequestDto, CreateAssetRecordResponseDto } from './dto/create-record.dto';
import { PaginatedDto } from '../utils/dto/paginated.dto';
import { AssetLegacyRecordDto } from './dto/legacy-record.dto';
import { AssetLegacyService } from '../explorer-backend/asset-legacy/asset-legacy.service';
import { AssetType } from '../utils/enums';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';

@Injectable()
export class AssetsService {
  constructor(private assetsLegacyService: AssetLegacyService) {}

  async create(assetType: AssetType, record: CreateAssetRecordRequestDto): Promise<CreateAssetRecordResponseDto> {
    try {
      return await this.assetsLegacyService.create({ assetType, ...record });
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw new BadRequestException(e.details || e.message);
      }
    }
  }

  async findAll(assetType: AssetType, filters: FindAllFiltersDto): Promise<PaginatedDto<AssetLegacyRecordDto>> {
    try {
      const {
        total,
        limit,
        offset,
        results = [],
      } = await this.assetsLegacyService.findAll({
        assetType,
        filters: {
          playerAddress: filters.playerAddress || '',
          assetId: filters.assetId || '',
          gameId: filters.gameId || '',
        },
        limit: Long.fromString(filters.limit),
        offset: Long.fromString(filters.offset),
      });
      return {
        total: total.toNumber(),
        limit: limit.toNumber(),
        offset: offset.toNumber(),
        results: results.map((record) => ({
          assetId: record.assetId,
          gameId: record.gameId,
          timestamp: record.timestamp.toNumber(),
          data: record.data,
        })),
      };
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw new BadRequestException(e.details || e.message);
      }
    }
  }

  async findById(assetType: AssetType, recordId: string): Promise<AssetLegacyRecordDto> {
    try {
      const response = await this.assetsLegacyService.findById({ assetType, recordId });
      return {
        assetId: response.record.assetId,
        gameId: response.record.gameId,
        timestamp: response.record.timestamp.toNumber(),
        data: response.record.data,
      };
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw new BadRequestException(e.details || e.message);
      }
    }
  }
}

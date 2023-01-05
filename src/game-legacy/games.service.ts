import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Long } from '@grpc/proto-loader';

import { CreateGameLegacyRequestDto, CreateGameLegacyResponseDto } from './dto/create-record.dto';
import { PaginatedDto } from '../utils/dto/paginated.dto';
import { GameLegacyRecordDto } from './dto/legacy-record.dto';
import { GameLegacyService } from '../explorer-backend/game-legacy/game-legacy.service';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';

@Injectable()
export class GamesService {
  constructor(private gamesLegacyService: GameLegacyService) {}

  async create(record: CreateGameLegacyRequestDto): Promise<CreateGameLegacyResponseDto> {
    try {
      return await this.gamesLegacyService.create(record);
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw new BadRequestException(e.details || e.message);
      }
    }
  }

  async findAll(filters: FindAllFiltersDto): Promise<PaginatedDto<GameLegacyRecordDto>> {
    try {
      const {
        total,
        limit,
        offset,
        results = [],
      } = await this.gamesLegacyService.findAll({
        filters: {
          gameAddress: filters.gameAddress || '',
        },
        limit: Long.fromString(filters.limit),
        offset: Long.fromString(filters.offset),
      });
      return {
        total: total.toNumber(),
        limit: limit.toNumber(),
        offset: offset.toNumber(),
        results: results.map((record) => ({
          ...record,
          timestamp: record.timestamp.toNumber(),
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

  async findById(recordId: string): Promise<GameLegacyRecordDto> {
    try {
      const { record } = await this.gamesLegacyService.findById({ recordId });
      return {
        ...record,
        timestamp: record.timestamp.toNumber(),
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

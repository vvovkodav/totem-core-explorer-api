import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Long } from '@grpc/proto-loader';

import { GamesDirectoryService as ExplorerGamesDirectory } from '../explorer-backend/games-directory/games-directory.service';
import { CreateGameRequestDto } from './dto/create-game.dto';
import { GameStatus } from '../utils/enums';
import { UpdateGameRequestDto, UpdateGameResponseDto } from './dto/update-game.dto';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';
import { PaginatedDto } from '../utils/dto/paginated.dto';
import { GameRecordDto } from './dto/game-record.dto';

@Injectable()
export class GamesDirectoryService {
  constructor(private gamesDirectoryService: ExplorerGamesDirectory) {}

  async create(record: CreateGameRequestDto) {
    try {
      return await this.gamesDirectoryService.create({ ...record, status: GameStatus.Accepted });
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw new BadRequestException(e.details || e.message);
      }
    }
  }

  async update(gameAddress: string, request: UpdateGameRequestDto): Promise<UpdateGameResponseDto> {
    try {
      return await this.gamesDirectoryService.update({ gameAddress, ...request });
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw new BadRequestException(e.details || e.message);
      }
    }
  }

  async findAll(filters: FindAllFiltersDto): Promise<PaginatedDto<GameRecordDto>> {
    try {
      const {
        total,
        limit,
        offset,
        results = [],
      } = await this.gamesDirectoryService.findAll({
        filters: { ownerAddress: filters.ownerAddress, status: filters.status },
        limit: Long.fromString(filters.limit),
        offset: Long.fromString(filters.offset),
      });
      return {
        total: total.toNumber(),
        limit: limit.toNumber(),
        offset: offset.toNumber(),
        results: results.map((record) => ({
          ...record,
          createdAt: record.createdAt.toNumber(),
          updatedAt: record.updatedAt.toNumber(),
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

  async findByAddress(gameAddress: string): Promise<GameRecordDto> {
    try {
      const { record } = await this.gamesDirectoryService.findByAddress({ gameAddress });
      return {
        ...record,
        createdAt: record.createdAt.toNumber(),
        updatedAt: record.updatedAt.toNumber(),
      };
    } catch (e) {
      switch (e.code) {
        case status.UNAVAILABLE:
          throw new InternalServerErrorException(e.details);
        default:
          throw HttpException.getDescriptionFrom(e.details) || new BadRequestException(e.message);
      }
    }
  }
}

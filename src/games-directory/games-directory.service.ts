import { Injectable } from '@nestjs/common';
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
    return await this.gamesDirectoryService.create({ ...record, status: GameStatus.Accepted });
  }

  async update(gameAddress: string, request: UpdateGameRequestDto): Promise<UpdateGameResponseDto> {
    return await this.gamesDirectoryService.update({ gameAddress, ...request });
  }

  async findAll(filters: FindAllFiltersDto): Promise<PaginatedDto<GameRecordDto>> {
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
  }

  async findByAddress(gameAddress: string): Promise<GameRecordDto> {
    const { record } = await this.gamesDirectoryService.findByAddress({ gameAddress });
    return {
      ...record,
      createdAt: record.createdAt.toNumber(),
      updatedAt: record.updatedAt.toNumber(),
    };
  }
}

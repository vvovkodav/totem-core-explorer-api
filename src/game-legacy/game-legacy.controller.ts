import { Body, Controller, Get, Param, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { GameLegacyService } from './game-legacy.service';
import { ApiPaginatedResponse, PaginatedDto } from '../utils/dto/paginated.dto';
import { UnhandledExceptionFilter } from '../utils/filters';
import { CreateGameLegacyRequestDto, CreateGameLegacyResponseDto } from './dto/create-record.dto';
import { GameLegacyRecordDto } from './dto/legacy-record.dto';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';
import { legacyGamesAddresses, legacyGamesIds } from '../utils/temp/legacyGamesMapping';

@ApiTags('Games Legacy')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(GameLegacyRecordDto)
@ApiExtraModels(CreateGameLegacyRequestDto)
@ApiExtraModels(CreateGameLegacyResponseDto)
@ApiExtraModels(FindAllFiltersDto)
@Controller('game-legacy')
@UseFilters(new UnhandledExceptionFilter())
export class GameLegacyController {
  constructor(private service: GameLegacyService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: { $ref: getSchemaPath(CreateGameLegacyResponseDto) },
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: CreateGameLegacyRequestDto,
  ): Promise<CreateGameLegacyResponseDto> {
    if (Object.keys(legacyGamesAddresses).includes(request.gameAddress)) {
      request.gameAddress = legacyGamesAddresses[request.gameAddress];
    }
    return await this.service.create(request);
  }

  @Get()
  @ApiPaginatedResponse(GameLegacyRecordDto, {
    description: 'Paginated list of the asset legacy records with query filters',
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true, stopAtFirstError: true })) filters: FindAllFiltersDto,
  ): Promise<PaginatedDto<GameLegacyRecordDto>> {
    if (filters.gameAddress && Object.keys(legacyGamesAddresses).includes(filters.gameAddress)) {
      filters.gameAddress = legacyGamesAddresses[filters.gameAddress];
      const res = await this.service.findAll(filters);
      res.results.map((game) => {
        if (Object.keys(legacyGamesIds).includes(game.gameAddress)) {
          game.gameAddress = legacyGamesIds[game.gameAddress];
        }
      });
      return res;
    }
    return await this.service.findAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Game legacy record by record index',
    schema: { $ref: getSchemaPath(GameLegacyRecordDto) },
  })
  async findById(@Param('id') id: string): Promise<GameLegacyRecordDto> {
    const res = await this.service.findById(id);
    if (Object.keys(legacyGamesIds).includes(res.gameAddress)) {
      res.gameAddress = legacyGamesIds[res.gameAddress];
    }
    return res;
  }
}

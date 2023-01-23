import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { GamesService } from './games.service';
import { CreateGameLegacyRequestDto, CreateGameLegacyResponseDto } from './dto/create-record.dto';
import { GameLegacyRecordDto } from './dto/legacy-record.dto';
import { ApiPaginatedResponse, PaginatedDto } from '../utils/dto/paginated.dto';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';

@ApiTags('Games Legacy')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(GameLegacyRecordDto)
@ApiExtraModels(CreateGameLegacyResponseDto)
@Controller('game-legacy')
export class GamesController {
  constructor(private service: GamesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: { $ref: getSchemaPath(CreateGameLegacyResponseDto) },
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: CreateGameLegacyRequestDto,
  ): Promise<CreateGameLegacyResponseDto> {
    return this.service.create(request);
  }

  @Get()
  @ApiPaginatedResponse(GameLegacyRecordDto, {
    description: 'Paginated list of the asset legacy records with query filters',
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true, stopAtFirstError: true })) filters: FindAllFiltersDto,
  ): Promise<PaginatedDto<GameLegacyRecordDto>> {
    return this.service.findAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Game legacy record by record index',
    schema: { $ref: getSchemaPath(GameLegacyRecordDto) },
  })
  async findById(@Param('id') id: string): Promise<GameLegacyRecordDto> {
    return this.service.findById(id);
  }
}

import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { GamesService } from './games.service';
import { CreateGameRecordDto } from './dto/create-record.dto';
import { GameLegacyRecordDto } from './dto/legacy-record.dto';
import { ApiPaginatedResponse, PaginatedDto } from '../utils/dto/paginated.dto';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';

@ApiTags('Games Legacy')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(GameLegacyRecordDto)
@Controller('game-legacy')
export class GamesController {
  constructor(private service: GamesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(@Body() request: CreateGameRecordDto) {
    return this.service.create(request);
  }

  @Get()
  @ApiPaginatedResponse(GameLegacyRecordDto, {
    description: 'Paginated list of the asset legacy records with query filters',
  })
  async findAll(@Query() filters: FindAllFiltersDto): Promise<PaginatedDto<GameLegacyRecordDto>> {
    return this.service.findAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(GameLegacyRecordDto) },
    description: 'Game legacy record by record index',
  })
  async findById(@Param('id') id: string): Promise<GameLegacyRecordDto> {
    return this.service.findById(id);
  }
}

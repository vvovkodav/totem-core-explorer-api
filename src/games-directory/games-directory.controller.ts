import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { UnhandledExceptionFilter } from '../utils/filters';
import { ValidAddressPipe } from '../utils/pipes';
import { ApiPaginatedResponse, PaginatedDto } from '../utils/dto/paginated.dto';
import { GamesDirectoryService } from './games-directory.service';
import { CreateGameRequestDto, CreateGameResponseDto } from './dto/create-game.dto';
import { UpdateGameRequestDto, UpdateGameResponseDto } from './dto/update-game.dto';
import { GameRecordDto } from './dto/game-record.dto';
import { FindAllFiltersDto } from './dto/find-all-filters.dto';

@ApiTags('Games Directory')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(GameRecordDto)
@ApiExtraModels(CreateGameRequestDto)
@ApiExtraModels(CreateGameResponseDto)
@ApiExtraModels(UpdateGameRequestDto)
@ApiExtraModels(UpdateGameResponseDto)
@ApiExtraModels(FindAllFiltersDto)
@Controller('games-directory')
@UseFilters(new UnhandledExceptionFilter())
export class GamesDirectoryController {
  constructor(private service: GamesDirectoryService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created successfully', schema: { $ref: getSchemaPath(CreateGameResponseDto) } })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiConflictResponse({ description: 'Game already exists' })
  async create(
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: CreateGameRequestDto,
  ): Promise<CreateGameResponseDto> {
    return await this.service.create(request);
  }

  @Patch(':address')
  @ApiOkResponse({
    description: 'Updated successfully, returning transaction hashes of the updated fields only',
    schema: { $ref: getSchemaPath(UpdateGameResponseDto) },
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async update(
    @Param('address', new ValidAddressPipe()) address: string,
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: UpdateGameRequestDto,
  ): Promise<UpdateGameResponseDto> {
    return await this.service.update(address, request);
  }

  @Get()
  @ApiPaginatedResponse(GameRecordDto, { description: 'Paginated list of the games' })
  async findAll(
    @Query(new ValidationPipe({ transform: true, stopAtFirstError: true })) filters: FindAllFiltersDto,
  ): Promise<PaginatedDto<GameRecordDto>> {
    return await this.service.findAll(filters);
  }

  @Get(':address')
  @ApiOkResponse({
    description: 'Game record',
    schema: { $ref: getSchemaPath(GameRecordDto) },
  })
  async findByAddress(@Param('address', new ValidAddressPipe()) address: string): Promise<GameRecordDto> {
    return await this.service.findByAddress(address);
  }
}

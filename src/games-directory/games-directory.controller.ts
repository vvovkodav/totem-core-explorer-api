import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../utils/dto/paginated.dto';
import { CreateGameRequestDto, CreateGameResponseDto } from './dto/create-game.dto';
import { GamesDirectoryService } from './games-directory.service';
import { GameRecordDto } from './dto/game-record.dto';

@ApiTags('Games Directory')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(GameRecordDto)
@ApiExtraModels(CreateGameResponseDto)
@Controller('games-directory')
export class GamesDirectoryController {
  constructor(private service: GamesDirectoryService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created', schema: { $ref: getSchemaPath(CreateGameResponseDto) } })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) createGameDto: CreateGameRequestDto,
  ): Promise<CreateGameResponseDto> {
    return this.service.create(createGameDto);
  }
}

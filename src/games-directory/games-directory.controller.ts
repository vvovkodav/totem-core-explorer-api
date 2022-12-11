import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from '../utils/dto/paginated.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesDirectoryService } from './games-directory.service';
import { GameRecordDto } from './dto/game-record.dto';

@ApiTags('Games Directory')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(GameRecordDto)
@Controller('games-directory')
export class GamesDirectoryController {
  constructor(private service: GamesDirectoryService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(@Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) createGameDto: CreateGameDto) {
    return this.service.create(createGameDto);
  }
}

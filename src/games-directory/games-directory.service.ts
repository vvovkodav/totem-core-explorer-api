import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

import { GamesDirectoryService as ExplorerGamesDirectory } from '../explorer-backend/games-directory/games-directory.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameStatus } from '../utils/enums';

@Injectable()
export class GamesDirectoryService {
  constructor(private gamesDirectoryService: ExplorerGamesDirectory) {}

  async create(record: CreateGameDto) {
    try {
      return await this.gamesDirectoryService.create({ ...record, status: GameStatus.ACCEPTED });
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

import { Module } from '@nestjs/common';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';
import { GamesDirectoryController } from './games-directory.controller';
import { GamesDirectoryService } from './games-directory.service';

@Module({
  imports: [ConfigModule, ExplorerBackendModule],
  controllers: [GamesDirectoryController],
  providers: [GamesDirectoryService],
})
export class GamesDirectoryModule {}

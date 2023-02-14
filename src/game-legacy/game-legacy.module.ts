import { Module } from '@nestjs/common';

import { GameLegacyController } from './game-legacy.controller';
import { GameLegacyService } from './game-legacy.service';
import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [GameLegacyController],
  providers: [GameLegacyService],
})
export class GameLegacyModule {}

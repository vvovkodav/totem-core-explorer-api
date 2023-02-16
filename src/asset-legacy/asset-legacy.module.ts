import { Module } from '@nestjs/common';

import { AssetLegacyController } from './asset-legacy.controller';
import { AssetLegacyService } from './asset-legacy.service';
import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [AssetLegacyController],
  providers: [AssetLegacyService],
})
export class AssetLegacyModule {}

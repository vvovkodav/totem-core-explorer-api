import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [AssetsController],
})
export class AssetsModule {}

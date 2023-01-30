import { Module } from '@nestjs/common';
import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}

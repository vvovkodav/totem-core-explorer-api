import { Module } from '@nestjs/common';
import { WithpaperService } from './withpaper.service';
import { WithpaperController } from './withpaper.controller';
import { ExplorerBackendModule } from 'src/explorer-backend/explorer-backend.module';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [WithpaperController],
  providers: [WithpaperService],
})
export class WithpaperModule {}

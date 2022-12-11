import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthzModule } from './healthz/healthz.module';
import { AssetsModule } from './asset-legacy/assets.module';
import { GamesModule } from './game-legacy/games.module';
import { GamesDirectoryModule } from './games-directory/games-directory.module';

@Module({
  imports: [ConfigModule.forRoot(), HealthzModule, AssetsModule, GamesModule, GamesDirectoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

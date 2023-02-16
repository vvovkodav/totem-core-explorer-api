import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthzModule } from './healthz/healthz.module';
import { AssetLegacyModule } from './asset-legacy/asset-legacy.module';
import { GameLegacyModule } from './game-legacy/game-legacy.module';
import { GamesDirectoryModule } from './games-directory/games-directory.module';
import { PublishersModule } from './publishers/publishers.module';
import { PaymentKeysModule } from './payment-keys/payment-keys.module';
import { AssetsModule as AssetsClaimModule } from './assets/assets.module';
import { WithpaperModule } from './payments/withpaper/withpaper.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthzModule,
    AssetLegacyModule,
    GameLegacyModule,
    GamesDirectoryModule,
    PublishersModule,
    PaymentKeysModule,
    AssetsClaimModule,
    WithpaperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

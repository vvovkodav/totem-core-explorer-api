import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthzModule } from './healthz/healthz.module';
import { AssetsModule } from './asset-legacy/assets.module';
import { GamesModule } from './game-legacy/games.module';
import { GamesDirectoryModule } from './games-directory/games-directory.module';
import { PublishersModule } from './publishers/publishers.module';
import { PaymentKeysModule } from './payment-keys/payment-keys.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthzModule,
    AssetsModule,
    GamesModule,
    GamesDirectoryModule,
    PublishersModule,
    PaymentKeysModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ExplorerProvider } from './explorer-backend.constants';
import { AssetLegacyService } from './asset-legacy/asset-legacy.service';
import { GameLegacyService } from './game-legacy/game-legacy.service';
import { GamesDirectoryService } from './games-directory/games-directory.service';
import { PublishersService } from './publishers/publishers.service';
import { PaymentKeysService } from './payment-keys/payment-keys.service';
import { AssetsService } from './assets/assets.service';
import { PaymentsService } from './payments/payments.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ExplorerProvider,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: config.get<string>('EXPLORER_BACKEND_URL'),
            package: [
              'asset_legacy',
              'game_legacy',
              'games_directory',
              'publishers',
              'payment_keys',
              'assets',
              'payments',
            ],
            protoPath: [
              join(__dirname, 'asset-legacy', 'proto', 'asset_legacy.proto'),
              join(__dirname, 'game-legacy', 'proto', 'game_legacy.proto'),
              join(__dirname, 'games-directory', 'proto', 'games_directory.proto'),
              join(__dirname, 'publishers', 'proto', 'publishers.proto'),
              join(__dirname, 'payment-keys', 'proto', 'payment-keys.proto'),
              join(__dirname, 'assets', 'proto', 'assets.proto'),
              join(__dirname, 'payments', 'proto', 'payments.proto'),
            ],
          },
        });
      },
    },
    AssetLegacyService,
    GameLegacyService,
    GamesDirectoryService,
    PublishersService,
    PaymentKeysService,
    AssetsService,
    PaymentsService,
  ],
  exports: [
    AssetLegacyService,
    GameLegacyService,
    GamesDirectoryService,
    PublishersService,
    PaymentKeysService,
    AssetsService,
    PaymentsService,
  ],
})
export class ExplorerBackendModule {}

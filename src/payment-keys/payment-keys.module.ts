import { Module } from '@nestjs/common';

import { PaymentKeysController } from './payment-keys.controller';
import { PaymentKeysService } from './payment-keys.service';
import { ExplorerBackendModule } from '../explorer-backend/explorer-backend.module';

@Module({
  imports: [ExplorerBackendModule],
  controllers: [PaymentKeysController],
  providers: [PaymentKeysService],
})
export class PaymentKeysModule {}

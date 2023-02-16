import { Injectable } from '@nestjs/common';
import { Long } from '@grpc/proto-loader';

import { PaymentKeysService as ExplorerPaymentKeys } from '../explorer-backend/payment-keys/payment-keys.service';
import { AssetType, PaymentKeyStatus } from '../utils/enums';

@Injectable()
export class PaymentKeysService {
  constructor(private paymentsService: ExplorerPaymentKeys) {}

  async create(assetType: AssetType, apiKey: string, amount: number) {
    return await this.paymentsService.create({
      assetType,
      apiKey,
      amount: Long.fromNumber(amount),
    });
  }

  async claim(assetType: AssetType, apiKey: string, playerAddress: string) {
    return await this.paymentsService.claim({
      assetType,
      apiKey,
      playerAddress,
    });
  }

  async status(assetType: AssetType, apiKey: string, status: PaymentKeyStatus) {
    const { amount } = await this.paymentsService.status({
      assetType,
      apiKey,
      status,
    });
    return { amount: amount.toNumber() };
  }
}

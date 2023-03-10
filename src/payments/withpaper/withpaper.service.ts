import { Injectable } from '@nestjs/common';

import { AssetType } from 'src/utils/enums';
import { WithpaperService as ExplorerPayments } from '../../explorer-backend/payments/withpaper/withpaper.service';

@Injectable()
export class WithpaperService {
  constructor(private paymentsService: ExplorerPayments) {}

  async createPaymentLink(assetType: AssetType, ownerAddress: string, successUrl: string, imageUrl: string) {
    return await this.paymentsService.createPaymentLink({
      assetType,
      ownerAddress,
      successUrl,
      imageUrl,
    });
  }

  async processWebhook(orderId: string, event: string, txHash: string) {
    return await this.paymentsService.processWebhook({
      orderId,
      event,
      txHash,
    });
  }
}

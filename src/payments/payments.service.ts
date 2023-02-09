import { Injectable } from '@nestjs/common';
import { AssetType } from 'src/utils/enums';
import { PaymentsService as ExplorerPaymentsService } from '../explorer-backend/payments/payments.service';

@Injectable()
export class PaymentsService {
  constructor(private paymentsService: ExplorerPaymentsService) {}

  async createWithpaperPaymentLink(assetType: AssetType, ownerAddress: string, successUrl: string) {
    return await this.paymentsService.createWithpaperPaymentLink({
      assetType,
      ownerAddress,
      successUrl,
    });
  }

  async processWithpaperWebhook(event: string, orderId: string, txHash: string) {
    return await this.paymentsService.processWithpaperWebhook({
      event,
      orderId,
      txHash,
    });
  }
}

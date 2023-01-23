import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import {
  ClaimPaymentKeyRequest,
  ClaimPaymentKeyResponse,
  CreatePaymentKeysRequest,
  PaymentKeys,
  PaymentKeysStatusRequest,
  PaymentKeysStatusResponse,
} from './payment-keys.interface';

@Injectable()
export class PaymentKeysService implements OnModuleInit {
  private service: PaymentKeys;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<PaymentKeys>('PaymentKeys');
  }

  async create(request: CreatePaymentKeysRequest): Promise<void> {
    return await firstValueFrom<void>(this.service.Create(request));
  }

  async claim(request: ClaimPaymentKeyRequest): Promise<ClaimPaymentKeyResponse> {
    return await firstValueFrom<ClaimPaymentKeyResponse>(this.service.Claim(request));
  }

  async status(request: PaymentKeysStatusRequest): Promise<PaymentKeysStatusResponse> {
    return await firstValueFrom<PaymentKeysStatusResponse>(this.service.Status(request));
  }
}

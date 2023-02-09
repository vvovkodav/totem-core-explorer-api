import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import { CreateWithpaperPaymentLinkRequest, CreateWithpaperPaymentLinkResponse, Payments } from './payments.interface';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private service: Payments;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<Payments>('Payments');
  }

  async createWithpaperPaymentLink(
    request: CreateWithpaperPaymentLinkRequest,
  ): Promise<CreateWithpaperPaymentLinkResponse> {
    return await firstValueFrom<CreateWithpaperPaymentLinkResponse>(this.service.CreateWithpaperPaymentLink(request));
  }
}

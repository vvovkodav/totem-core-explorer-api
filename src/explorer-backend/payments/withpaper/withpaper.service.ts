import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../../explorer-backend.constants';
import {
  CreatePaymentLinkRequest,
  CreatePaymentLinkResponse,
  ProcessWebhookRequest,
  Withpaper,
} from './withpaper.interface';

@Injectable()
export class WithpaperService implements OnModuleInit {
  private service: Withpaper;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<Withpaper>('Withpaper');
  }

  async createPaymentLink(request: CreatePaymentLinkRequest): Promise<CreatePaymentLinkResponse> {
    return await firstValueFrom<CreatePaymentLinkResponse>(this.service.CreatePaymentLink(request));
  }

  async processWebhook(request: ProcessWebhookRequest): Promise<void> {
    return await firstValueFrom<void>(this.service.ProcessWebhook(request));
  }
}

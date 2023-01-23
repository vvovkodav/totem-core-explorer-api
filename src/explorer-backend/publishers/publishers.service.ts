import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import { CreatePublisherRequest, CreatePublisherResponse, Publishers } from './publishers.interface';

@Injectable()
export class PublishersService implements OnModuleInit {
  private service: Publishers;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<Publishers>('Publishers');
  }

  async create(request: CreatePublisherRequest): Promise<CreatePublisherResponse> {
    return await firstValueFrom<CreatePublisherResponse>(this.service.Create(request));
  }
}

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import { Assets, ClaimRequest, ClaimResponse, CreateRequest, InfoRequest, UpdateRequest } from './assets.interface';

@Injectable()
export class AssetsService implements OnModuleInit {
  private service: Assets;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<Assets>('Assets');
  }

  async create(request: CreateRequest) {
    return await firstValueFrom(this.service.Create(request));
  }

  async update(request: UpdateRequest) {
    return await firstValueFrom(this.service.Update(request));
  }

  async info(request: InfoRequest) {
    return await firstValueFrom(this.service.Info(request));
  }

  async claim(request: ClaimRequest): Promise<ClaimResponse> {
    return await firstValueFrom<ClaimResponse>(this.service.Claim(request));
  }
}

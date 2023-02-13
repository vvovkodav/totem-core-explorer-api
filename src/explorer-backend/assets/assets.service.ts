import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ExplorerProvider } from '../explorer-backend.constants';
import { Assets, ClaimAssetRequest, ClaimAssetResponse } from './assets.interface';

@Injectable()
export class AssetsService implements OnModuleInit {
  private service: Assets;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<Assets>('Assets');
  }

  async claimAsset(request: ClaimAssetRequest): Promise<ClaimAssetResponse> {
    return await firstValueFrom<ClaimAssetResponse>(this.service.ClaimAsset(request));
  }
}

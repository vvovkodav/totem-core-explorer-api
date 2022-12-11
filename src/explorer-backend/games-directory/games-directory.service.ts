import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import {
  CreateGameRequest,
  Empty,
  GamesDirectory,
  UpdateGameAssetFilterRequest,
  UpdateGameAuthorRequest,
  UpdateGameAvatarFilterRequest,
  UpdateGameGemFilterRequest,
  UpdateGameNameRequest,
  UpdateGameOwnerRequest,
  UpdateGameRendererRequest,
  UpdateGameStatusRequest,
  UpdateGameWebsiteRequest,
} from './games-directory.interface';

@Injectable()
export class GamesDirectoryService implements OnModuleInit {
  private service: GamesDirectory;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<GamesDirectory>('GamesDirectory');
  }

  async create(request: CreateGameRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.Create(request));
  }

  async updateGameOwner(request: UpdateGameOwnerRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameOwner(request));
  }

  async updateGameName(request: UpdateGameNameRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameName(request));
  }

  async updateGameAuthor(request: UpdateGameAuthorRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameAuthor(request));
  }

  async updateGameRenderer(request: UpdateGameRendererRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameRenderer(request));
  }

  async updateGameAvatarFilter(request: UpdateGameAvatarFilterRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameAvatarFilter(request));
  }

  async updateGameAssetFilter(request: UpdateGameAssetFilterRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameAssetFilter(request));
  }

  async updateGameGemFilter(request: UpdateGameGemFilterRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameGemFilter(request));
  }

  async updateGameWebsite(request: UpdateGameWebsiteRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameWebsite(request));
  }

  async updateGameStatus(request: UpdateGameStatusRequest): Promise<Empty> {
    return await firstValueFrom<Empty>(this.service.UpdateGameStatus(request));
  }
}

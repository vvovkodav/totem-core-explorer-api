import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import { CreateGameRequest, CreateGameResponse, GamesDirectory } from './games-directory.interface';

@Injectable()
export class GamesDirectoryService implements OnModuleInit {
  private service: GamesDirectory;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<GamesDirectory>('GamesDirectory');
  }

  async create(request: CreateGameRequest): Promise<CreateGameResponse> {
    return await firstValueFrom<CreateGameResponse>(this.service.Create(request));
  }
}

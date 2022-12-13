import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import {
  CreateGameLegacyRequest,
  CreateGameLegacyResponse,
  FindAllRequest,
  FindAllResponse,
  FindByIdRequest,
  FindByIdResponse,
  GameLegacy,
} from './game-legacy.interface';

@Injectable()
export class GameLegacyService implements OnModuleInit {
  private service: GameLegacy;

  constructor(@Inject(ExplorerProvider) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<GameLegacy>('GameLegacy');
  }

  async create(request: CreateGameLegacyRequest): Promise<CreateGameLegacyResponse> {
    return await firstValueFrom<CreateGameLegacyResponse>(this.service.Create(request));
  }

  async findAll(request: FindAllRequest): Promise<FindAllResponse> {
    return await firstValueFrom<FindAllResponse>(this.service.FindAll(request));
  }

  async findById(request: FindByIdRequest): Promise<FindByIdResponse> {
    return await firstValueFrom<FindByIdResponse>(this.service.FindById(request));
  }
}

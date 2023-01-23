import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ExplorerProvider } from '../explorer-backend.constants';
import {
  CreateGameRequest,
  CreateGameResponse,
  FindAllRequest,
  FindAllResponse,
  FindByAddressRequest,
  FindByAddressResponse,
  FindByIdRequest,
  FindByIdResponse,
  GamesDirectory,
  UpdateGameRequest,
  UpdateGameResponse,
} from './games-directory.interface';

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

  async update(request: UpdateGameRequest): Promise<UpdateGameResponse> {
    return await firstValueFrom<UpdateGameResponse>(this.service.Update(request));
  }

  async findAll(request: FindAllRequest): Promise<FindAllResponse> {
    return await firstValueFrom<FindAllResponse>(this.service.FindAll(request));
  }

  async findById(request: FindByIdRequest): Promise<FindByIdResponse> {
    return await firstValueFrom<FindByIdResponse>(this.service.FindById(request));
  }

  async findByAddress(request: FindByAddressRequest): Promise<FindByAddressResponse> {
    return await firstValueFrom<FindByAddressResponse>(this.service.FindByAddress(request));
  }
}

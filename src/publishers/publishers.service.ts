import { Injectable } from '@nestjs/common';

import { PublishersService as ExplorerPublishers } from '../explorer-backend/publishers/publishers.service';
import { CreatePublisherRequest } from '../explorer-backend/publishers/publishers.interface';

@Injectable()
export class PublishersService {
  constructor(private publishersService: ExplorerPublishers) {}

  async create(request: CreatePublisherRequest) {
    return await this.publishersService.create(request);
  }
}

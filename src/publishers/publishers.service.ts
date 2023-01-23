import { Injectable } from '@nestjs/common';

import { PublishersService as ExplorerPublishersService } from '../explorer-backend/publishers/publishers.service';
import { CreatePublisherRequest } from '../explorer-backend/publishers/publishers.interface';

@Injectable()
export class PublishersService {
  constructor(private publishersService: ExplorerPublishersService) {}

  async create(request: CreatePublisherRequest) {
    return await this.publishersService.create(request);
  }
}

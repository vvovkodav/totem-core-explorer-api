import { Body, Controller, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { PublishersService } from './publishers.service';
import { UnhandledExceptionFilter } from '../utils/filters';
import { CreatePublisherRequestDto, CreatePublisherResponseDto } from './dto/create.dto';

@ApiTags('Publishers')
@ApiExtraModels(CreatePublisherRequestDto)
@ApiExtraModels(CreatePublisherResponseDto)
@Controller('publishers')
@UseFilters(new UnhandledExceptionFilter())
export class PublishersController {
  constructor(private service: PublishersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: { $ref: getSchemaPath(CreatePublisherResponseDto) },
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiConflictResponse({ description: 'Duplicate publisher name' })
  async create(
    @Body(new ValidationPipe({ transform: true, stopAtFirstError: true })) request: CreatePublisherRequestDto,
  ) {
    const { apiKey } = await this.service.create(request);
    return { apiKey };
  }
}

import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiExcludeController()
@ApiTags('Service Health Checking')
@Controller('healthz')
export class HealthzController {
  @Get()
  @Header('Cache-Control', 'none')
  @ApiOkResponse({
    headers: {
      'Cache-Control': {
        schema: { type: 'string' },
        description: 'default: none',
      },
    },
  })
  index() {
    return {};
  }
}

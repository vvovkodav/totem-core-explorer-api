import { Module } from '@nestjs/common';
import { HealthzController } from './healthz.controller';

@Module({
  controllers: [HealthzController],
  providers: [],
  exports: [],
})
export class HealthzModule {}

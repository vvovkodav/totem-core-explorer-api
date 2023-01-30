import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherRequestDto {
  @ApiProperty({ description: 'publisher name', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'publisher webhook url', required: true })
  @IsString()
  webhookUrl: string;
}

export class CreatePublisherResponseDto {
  @ApiProperty({ description: 'publisher api key' })
  apiKey: string;
}

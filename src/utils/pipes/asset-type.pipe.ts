import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AssetType } from '../enums';

@Injectable()
export class AssetTypePipe implements PipeTransform<string, AssetType> {
  transform(value: string, metadata: ArgumentMetadata): AssetType {
    switch (value) {
      case 'avatar':
        return AssetType.AVATAR;
      case 'asset':
        return AssetType.ASSET;
      case 'gem':
        return AssetType.GEM;
      default:
        throw new BadRequestException(`invalid asset type "${value}"`);
    }
  }
}

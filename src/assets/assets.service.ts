import { Injectable } from '@nestjs/common';
import { AssetType } from 'src/utils/enums';
import { AssetsService as ExplorerAssetsService } from '../explorer-backend/assets/assets.service';

@Injectable()
export class AssetsService {
  constructor(private service: ExplorerAssetsService) {}

  async claimAssets(ownerAddress: string, assetType: AssetType) {
    return await this.service.claimAsset({ ownerAddress, assetType });
  }
}

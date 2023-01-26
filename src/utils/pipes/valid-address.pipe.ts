import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { constants, utils } from 'ethers';
import { legacyGamesAddresses } from '../temp/legacyGamesMapping';

@Injectable()
export class ValidAddressPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (Object.keys(legacyGamesAddresses).includes(value)) {
      return legacyGamesAddresses[value];
    }
    if (!utils.isAddress(<string>value) || value === constants.AddressZero) {
      throw new BadRequestException(`invalid address "${value}"`);
    }
    return value;
  }
}

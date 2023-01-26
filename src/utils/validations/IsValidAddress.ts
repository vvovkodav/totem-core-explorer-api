import { registerDecorator, ValidationOptions } from 'class-validator';
import { constants, utils } from 'ethers';

import { legacyGamesAddresses } from '../temp/legacyGamesMapping';

export function IsValidAddress(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidAddress',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return (
            (utils.isAddress(<string>value) && value !== constants.AddressZero) ||
            Object.keys(legacyGamesAddresses).includes(<string>value)
          );
        },
        defaultMessage() {
          return `$property value ($value) is invalid address`;
        },
      },
    });
  };
}

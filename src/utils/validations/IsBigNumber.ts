import { registerDecorator, ValidationOptions } from 'class-validator';
import { BigNumber, constants } from 'ethers';

export function IsBigNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsBigNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          try {
            const val = BigNumber.from(value);
            return val.gte(constants.Zero) && val.lte(constants.MaxUint256);
          } catch (ex) {
            return false;
          }
        },
        defaultMessage() {
          return `$property value ($value) is invalid`;
        },
      },
    });
  };
}

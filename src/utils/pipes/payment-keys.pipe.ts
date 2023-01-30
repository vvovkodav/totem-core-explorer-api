import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PaymentKeyStatus } from '../enums';

@Injectable()
export class PaymentKeysPipe implements PipeTransform<string, PaymentKeyStatus> {
  transform(value: string): PaymentKeyStatus {
    switch (value) {
      case 'reserved':
        return PaymentKeyStatus.Reserved;
      case 'inTransaction':
        return PaymentKeyStatus.InTransaction;
      case 'claimed':
        return PaymentKeyStatus.Claimed;
      default:
        throw new BadRequestException(`invalid payment key status "${value}"`);
    }
  }
}

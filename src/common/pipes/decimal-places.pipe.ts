import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class DecimalPlacesPipe implements PipeTransform {
  constructor(private decimalPlaces: 2) {}

  transform(value: number) {
    if (typeof value !== 'number') {
      return value;
    }

    const formattedValue = Number(value.toFixed(this.decimalPlaces));

    return formattedValue;
  }
}

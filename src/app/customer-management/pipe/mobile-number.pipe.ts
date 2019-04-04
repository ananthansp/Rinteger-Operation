import { Pipe, PipeTransform } from '@angular/core';
import {Customer} from '../../shared/customer.model';

@Pipe({
  name: 'mobileNumber'
})
export class MobileNumberPipe implements PipeTransform {

  transform(value: Customer[], searchText: number): Customer[] {
    if (!value || !searchText) {
      return value;
              } else {
                return value.filter(data => data.mobileNumber);
              }
  }

}

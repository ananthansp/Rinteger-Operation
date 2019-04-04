import { Pipe, PipeTransform } from '@angular/core';
import {Customer} from '../../shared/customer.model';

@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

  transform(value: Customer[], searchText: string): Customer[] {
    console.log('city value', searchText);
    if (!value || !searchText) {
      return value;
              } else {
                return value.filter(data => data.city.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
              }
  }

}

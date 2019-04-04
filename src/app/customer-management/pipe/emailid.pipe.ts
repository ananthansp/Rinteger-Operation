import { Pipe, PipeTransform } from '@angular/core';
import {Customer} from '../../shared/customer.model';

@Pipe({
  name: 'emailid'
})
export class EmailidPipe implements PipeTransform {

  transform(value: Customer[], searchText: string): Customer[] {
    if (!value || !searchText) {
      return value;
              } else {
                return value.filter(data => data.emailId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
              }
  }

}

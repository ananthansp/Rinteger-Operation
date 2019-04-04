import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { UploadCustomerComponent } from './shared/upload-customer/upload-customer.component';
import { CreateMarketcustomerComponent } from './marketcustomer/create-marketcustomer/create-marketcustomer.component';
import { ViewMarketcustomerComponent } from './marketcustomer/view-marketcustomer/view-marketcustomer.component';
import { EditMarketcustomerComponent } from './marketcustomer/edit-marketcustomer/edit-marketcustomer.component';
import { ViewSubcribecustomerComponent } from './../customer-management/subscribecustomer/view-subcribecustomer/view-subcribecustomer.component';


const routes: Routes = [
  /* {
    path: 'createcustomer',
    component: CreateCustomerComponent
  }, */
  {
    path: 'viewcustomer',
    component: ViewCustomerComponent
  },
  {
    path: 'editcustomer/:id',
    component: EditCustomerComponent
  },
  {
    path: 'upload',
    component: UploadCustomerComponent
  },
  {
    path: 'viewmarket',
    component: ViewMarketcustomerComponent
  },
  {
    path: 'editmarket/:id',
    component: EditMarketcustomerComponent
  },
  {
    path: 'viewsubscribe',
    component: ViewSubcribecustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }


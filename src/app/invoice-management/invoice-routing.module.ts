import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewSingleInvoiceComponent } from './view-single-invoice/view-single-invoice.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllInvoiceComponent } from './view-all-invoice/view-all-invoice.component';
import {EditInvoiceComponent} from './edit-invoice/edit-invoice.component';
const routes: Routes = [
  {
    path: 'createinvoice/:leadId/:workId',
    component: CreateInvoiceComponent
  },
  {
    path: 'viewinvoice/:workId',
    component: ViewInvoiceComponent
  },
  {
    path: 'viewsingleinvoice/:invId',
    component: ViewSingleInvoiceComponent
  },
  {
    path: 'viewallinvoice',
    component: ViewAllInvoiceComponent
  },
  {
    path: 'editinvoice/:id',
    component: EditInvoiceComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProformaComponent } from './create-proforma/create-proforma.component';
import { ViewSingleProformaComponent } from './view-single-proforma/view-single-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllProformaComponent } from './view-all-proforma/view-all-proforma.component';
import {EditProfomaInvoiceComponent} from './edit-profoma-invoice/edit-profoma-invoice.component';

const routes: Routes = [
  {
    path: 'createproformainvoice/:leadId/:workId',
    component: CreateProformaComponent
  },
  {
    path: 'viewsingleproformainvoice/:pinvId',
    component: ViewSingleProformaComponent
  },
  {
    path: 'viewproformainvoice/:workId',
    component: ViewProformaComponent
  },
  {
    path: 'viewallproformainvoice',
    component: ViewAllProformaComponent
  },
  {
    path: 'editprofomainvoice/:id',
    component: EditProfomaInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }

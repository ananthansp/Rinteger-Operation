import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadAddComponent } from './lead-add/lead-add.component';
import { LeadEditComponent } from './lead-edit/lead-edit.component';
import { ViewLeadComponent } from './view-lead/view-lead.component';
import { ViewSingleLeadComponent } from './view-single-lead/view-single-lead.component';

const routes: Routes = [
  {
    path: 'leadview',
    component: ViewLeadComponent
  },
  {
  path: 'leadedit/:id',
  component: LeadEditComponent
},
{
  path: 'leadadd',
  component: LeadAddComponent
},
{
  path: 'viewsinglelead/:id',
  component: ViewSingleLeadComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadManagementRoutingModule { }

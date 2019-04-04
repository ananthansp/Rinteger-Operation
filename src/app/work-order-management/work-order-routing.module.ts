import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateWorkorderComponent } from './create-workorder/create-workorder.component';
import { ViewSingleWorkorderComponent } from './view-single-workorder/view-single-workorder.component';
import { EditWorkorderComponent } from './edit-workorder/edit-workorder.component';
import { ViewWorkorderComponent } from './view-workorder/view-workorder.component';
import { ViewAllWorkorderComponent } from './view-all-workorder/view-all-workorder.component';

const routes: Routes = [
  {
    path: 'creatework/:id/:leadId',
    component: CreateWorkorderComponent
  },
  {
  path: 'viewsingleworkorder/:workId',
  component: ViewSingleWorkorderComponent
},
{
  path: 'editworkorder/:workId',
  component: EditWorkorderComponent
},
{
  path: 'viewworkorder/:leadId',
  component: ViewWorkorderComponent
}, {
  path: 'viewallworkorder',
  component: ViewAllWorkorderComponent
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }

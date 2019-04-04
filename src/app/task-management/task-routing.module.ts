import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskFormComponent } from './create-task-form/create-task-form.component';
import { ViewAllTaskComponent } from './view-all-task/view-all-task.component';
import { ViewSingleTaskComponent } from './view-single-task/view-single-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [{ path: 'create/:id', component: CreateTaskFormComponent},
{ path: 'viewtask/:id', component: ViewAllTaskComponent},
{ path: 'viewsingle/:id/:single', component: ViewSingleTaskComponent},
{ path: 'edittask/:id/:editview', component: EditTaskComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewIncomeComponent } from './view-income/view-income.component';
 import { EditIncomeComponent } from './edit-income/edit-income.component';
 import { ViewEditedIncomeComponent } from './view-edited-income/view-edited-income.component';
 import { EditIncomeSheetComponent } from './edit-income-sheet/edit-income-sheet.component'; 
const routes: Routes = [ 
  {
    path: 'viewincome',
    component: ViewIncomeComponent
  },
   {
    path: 'editincome/:id',
    component: EditIncomeComponent
  },
  {
    path: 'viewincomesheet',
    component: ViewEditedIncomeComponent
  },
  {
    path: "editincomesheet/:id",
    component: EditIncomeSheetComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }


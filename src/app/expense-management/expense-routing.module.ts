import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ViewSingleExpenseComponent } from './view-single-expense/view-single-expense.component';

const routes: Routes = [
  {
    path: 'createExpense',
    component: CreateExpenseComponent
  },
  {
    path: 'viewExpense',
    component: ViewExpenseComponent
  },
  {
    path: 'editExpense/:id',
    component: EditExpenseComponent
  },
  {
    path: 'singleViewExpense/:id',
    component: ViewSingleExpenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }


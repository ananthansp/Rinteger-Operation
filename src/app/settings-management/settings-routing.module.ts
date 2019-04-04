import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeadSettingsComponent } from './lead-settings/lead-settings.component';
import { WorkorderPdfTemplateComponent } from './workorder-pdf-template/workorder-pdf-template.component';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { TicketSettingComponent } from './ticket-setting/ticket-setting.component';
import { IncomeSettingsComponent } from './income-settings/income-settings.component';
import { MaterialSettingsComponent } from './material-settings/material-settings.component';
import { TaskSettingsComponent } from './task-settings/task-settings.component';

const routes: Routes = [
  {
    path: 'leadsettings',
    component: LeadSettingsComponent
  },
  {
    path: 'workorderpdf',
    component: WorkorderPdfTemplateComponent
  },
  {
    path: 'expensesetting',
    component: ExpenseSettingsComponent
  },
  {
    path: 'ticketsetting',
    component: TicketSettingComponent
  },
  {
    path: 'incomesetting',
    component: IncomeSettingsComponent
  }, {
    path: 'materialsetting',
    component: MaterialSettingsComponent
  },
  {
    path: 'tasksetting',
    component: TaskSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule { }

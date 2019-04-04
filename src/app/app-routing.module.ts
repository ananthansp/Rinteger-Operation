import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/authguard/auth.guard';

const routes: Routes = [
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: './customer-management/customer.module#CustomersModule'
  },
  {
    path: 'lead',
    canActivate: [AuthGuard],
    loadChildren: './lead-management/lead-management.module#LeadManagementModule'
  },
  {
    path: 'workorder',
    canActivate: [AuthGuard],
    loadChildren: './work-order-management/work-order-management.module#WorkOrderManagementModule'
  },
  {
    path: 'quotation',
    canActivate: [AuthGuard],
    loadChildren: './quotation-management/quotation-management.module#QuotationManagementModule'
  },
  {
    path: 'invoice',
    canActivate: [AuthGuard],
    loadChildren: './invoice-management/invoice-management.module#InvoiceManagementModule'
  },
  {
    path: 'proformainvoice',
    canActivate: [AuthGuard],
    loadChildren: './proforma-invoice-management/proforma-invoice-management.module#ProformaInvoiceManagementModule'
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: './settings-management/settings-management.module#SettingsManagementModule'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
  },
  {
    path: 'expense',
    loadChildren: './expense-management/expense.module#ExpenseModule',
  },
  {
    path: 'income',
    loadChildren: './income-management/income.module#IncomeModule',
  },
  {
    path: 'ticket',
    loadChildren: './ticket/ticket.module#TicketModule',
  },
  {
    path: 'task',
    loadChildren: './task-management/task.module#TaskModule',
  },
  {
    path: 'material',
    loadChildren: './material-management/material-management.module#MaterialModule',
  },
  {
    path: 'user',
    loadChildren: './user-management/user-management.module#UserManagementModule',
  },
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

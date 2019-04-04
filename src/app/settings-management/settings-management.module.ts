import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadSettingsComponent } from './lead-settings/lead-settings.component';
import { WorkorderPdfTemplateComponent } from './workorder-pdf-template/workorder-pdf-template.component';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatStepperModule,
  MatDatepickerModule
} from '@angular/material';
import { MaterialSettingsComponent } from './material-settings/material-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingsServiceService } from './settings-service.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { IncomeSettingsComponent } from './income-settings/income-settings.component';
import { TicketSettingComponent } from './ticket-setting/ticket-setting.component';
import { TaskSettingsComponent } from './task-settings/task-settings.component';
@NgModule({
  declarations: [LeadSettingsComponent, WorkorderPdfTemplateComponent, ExpenseSettingsComponent, TicketSettingComponent,
    IncomeSettingsComponent, MaterialSettingsComponent, TaskSettingsComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SettingsRoutingModule
  ],
  providers: [SettingsServiceService]
})
export class SettingsManagementModule { }

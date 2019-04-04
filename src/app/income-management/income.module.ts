import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeRoutingModule } from './income-route';
import { IncomeManagementService } from './income-management.service';
import { ViewIncomeComponent } from './view-income/view-income.component';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatAutocompleteModule,
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
  MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { ViewEditedIncomeComponent } from './view-edited-income/view-edited-income.component';
import { EditIncomeSheetComponent } from './edit-income-sheet/edit-income-sheet.component';
import { SearchIncomeComponent } from './search-income/search-income.component';


@NgModule({
  declarations: [
    ViewIncomeComponent,
    EditIncomeComponent,
    ViewEditedIncomeComponent,
    EditIncomeSheetComponent,
    SearchIncomeComponent
    ],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    IncomeRoutingModule,
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
    MatAutocompleteModule,
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
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    IncomeManagementService
  ],
  entryComponents: []
})
export class IncomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from './invoice.service';
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
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewSingleInvoiceComponent } from './view-single-invoice/view-single-invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ViewAllInvoiceComponent } from './view-all-invoice/view-all-invoice.component';
import { InvoiceGeneratePdfComponent } from './invoice-generate-pdf/invoice-generate-pdf.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { SearchInvoiceComponent } from './search-invoice/search-invoice.component';

@NgModule({
  declarations: [CreateInvoiceComponent,
     ViewInvoiceComponent,
      ViewSingleInvoiceComponent,
      ViewAllInvoiceComponent,
      InvoiceGeneratePdfComponent, EditInvoiceComponent, SearchInvoiceComponent],
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
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    InvoiceRoutingModule
  ],
  providers: [InvoiceService]
})
export class InvoiceManagementModule { }

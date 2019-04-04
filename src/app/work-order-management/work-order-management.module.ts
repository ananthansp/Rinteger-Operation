import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWorkorderComponent } from './create-workorder/create-workorder.component';
import { ViewSingleWorkorderComponent } from './view-single-workorder/view-single-workorder.component';
import { EditWorkorderComponent } from './edit-workorder/edit-workorder.component';
import { ViewWorkorderComponent } from './view-workorder/view-workorder.component';
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { WorkOrderService } from './work-order.service';
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
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewAllWorkorderComponent } from './view-all-workorder/view-all-workorder.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { SearchWorkorderComponent } from './search-workorder/search-workorder.component';

@NgModule({
  declarations: [CreateWorkorderComponent,
    ViewSingleWorkorderComponent,
    EditWorkorderComponent,
    ViewWorkorderComponent,
    GeneratePdfComponent,
    ViewAllWorkorderComponent,
    SearchWorkorderComponent],
    imports: [
      HttpClientModule,
      HttpModule,
      CommonModule,
      WorkOrderRoutingModule,
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
      MatNativeDateModule
    ],
    providers: [WorkOrderService]
})
export class WorkOrderManagementModule { }

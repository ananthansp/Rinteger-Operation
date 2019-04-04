import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket/ticket.component';
import {TicketService} from './ticket.service';
import {MatBadgeModule} from '@angular/material/badge';
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
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { UniqueTicketComponent } from './unique-ticket/unique-ticket.component';
import { TicketcustomersearchComponent } from './ticketcustomersearch/ticketcustomersearch.component';
import { UnitwiseViewComponent } from './unitwise-view/unitwise-view.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

@NgModule({
  declarations: [TicketComponent, TicketViewComponent, UniqueTicketComponent,
     TicketcustomersearchComponent, UnitwiseViewComponent, TicketEditComponent],
  imports: [
    CommonModule,HttpModule,
    TicketRoutingModule,FormsModule,ReactiveFormsModule,MatBadgeModule,
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
  ],
  providers: [TicketService]
})
export class TicketModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialRoutingModule } from './material-management.route';
import { MaterialManagementService } from './material-management.service';
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
import { CreateMaterialComponent } from './create-material/create-material.component';
import { ViewMaterialComponent } from './view-material/view-material.component';
import { ViewSingleMaterialComponent } from './view-single-material/view-single-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { FrontScreenComponent } from './front-screen/front-screen.component';
import { SearchMaterialComponent } from './search-material/search-material.component';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [
    CreateMaterialComponent,
    ViewMaterialComponent,
    ViewSingleMaterialComponent,
    EditMaterialComponent,
    FrontScreenComponent,
    SearchMaterialComponent,
    ViewProductComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    MaterialRoutingModule,
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
    MaterialManagementService
  ],
  entryComponents: []
})
export class MaterialModule { }

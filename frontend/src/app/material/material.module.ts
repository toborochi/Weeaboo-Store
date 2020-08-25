import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FlexModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from "@angular/forms";
import { CreditCardDirectivesModule } from 'angular-cc-library';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';

const MaterialComponents =[
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatGridListModule,
  MatExpansionModule,
  IvyCarouselModule,
  FlexModule,
  MatCardModule,
  MatRippleModule,
  MatMenuModule,
  MatTooltipModule,
  MatButtonToggleModule,
  NgxSpinnerModule,
  MatListModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTableModule,
  MatStepperModule,
  MatChipsModule,
  MatSnackBarModule,
  MatSidenavModule,
  FormsModule,
  CreditCardDirectivesModule,
  MatSlideToggleModule,
  MatDialogModule
];

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }

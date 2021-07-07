import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SightDetailsComponent } from './components/sight-details/sight-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SightAddEditComponent } from './components/sight-add-edit/sight-add-edit.component';



@NgModule({
  declarations: [SightDetailsComponent, SightAddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SightModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnotationFormsPageRoutingModule } from './annotation-forms-routing.module';

import { AnnotationFormsPage } from './annotation-forms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnotationFormsPageRoutingModule
  ],
  declarations: [AnnotationFormsPage]
})
export class AnnotationFormsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryFormsPageRoutingModule } from './entry-forms-routing.module';

import { EntryFormsPage } from './entry-forms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryFormsPageRoutingModule
  ],
  declarations: [EntryFormsPage]
})
export class EntryFormsPageModule {}

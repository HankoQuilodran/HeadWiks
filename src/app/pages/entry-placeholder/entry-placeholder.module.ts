import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryPlaceholderPageRoutingModule } from './entry-placeholder-routing.module';

import { EntryPlaceholderPage } from './entry-placeholder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryPlaceholderPageRoutingModule
  ],
  declarations: [EntryPlaceholderPage]
})
export class EntryPlaceholderPageModule {}

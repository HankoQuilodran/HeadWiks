import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryPreviewPageRoutingModule } from './entry-preview-routing.module';

import { EntryPreviewPage } from './entry-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryPreviewPageRoutingModule
  ],
  declarations: [EntryPreviewPage]
})
export class EntryPreviewPageModule {}

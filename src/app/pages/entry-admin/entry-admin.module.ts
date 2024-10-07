import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryAdminPageRoutingModule } from './entry-admin-routing.module';

import { EntryAdminPage } from './entry-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryAdminPageRoutingModule
  ],
  declarations: [EntryAdminPage]
})
export class EntryAdminPageModule {}

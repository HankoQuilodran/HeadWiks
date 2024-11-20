import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecPasswordPageRoutingModule } from './rec-password-routing.module';

import { RecPasswordPage } from './rec-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecPasswordPageRoutingModule
  ],
  declarations: [RecPasswordPage]
})
export class RecPasswordPageModule {}

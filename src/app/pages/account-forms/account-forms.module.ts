import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountFormsPageRoutingModule } from './account-forms-routing.module';

import { AccountFormsPage } from './account-forms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountFormsPageRoutingModule
  ],
  declarations: [AccountFormsPage]
})
export class AccountFormsPageModule {}

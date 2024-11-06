import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchUserPageRoutingModule } from './watch-user-routing.module';

import { WatchUserPage } from './watch-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchUserPageRoutingModule
  ],
  declarations: [WatchUserPage]
})
export class WatchUserPageModule {}

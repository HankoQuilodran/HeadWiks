import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Watchuserpage2PageRoutingModule } from './watchuserpage2-routing.module';

import { Watchuserpage2Page } from './watchuserpage2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Watchuserpage2PageRoutingModule
  ],
  declarations: [Watchuserpage2Page]
})
export class Watchuserpage2PageModule {}

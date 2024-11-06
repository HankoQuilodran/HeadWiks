import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Watchuserpage2Page } from './watchuserpage2.page';

const routes: Routes = [
  {
    path: '',
    component: Watchuserpage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Watchuserpage2PageRoutingModule {}

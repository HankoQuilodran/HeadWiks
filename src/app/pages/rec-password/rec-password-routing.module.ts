import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecPasswordPage } from './rec-password.page';

const routes: Routes = [
  {
    path: '',
    component: RecPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecPasswordPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchUserPage } from './watch-user.page';

const routes: Routes = [
  {
    path: '',
    component: WatchUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchUserPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryAdminPage } from './entry-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EntryAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryAdminPageRoutingModule {}

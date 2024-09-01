import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryPlaceholderPage } from './entry-placeholder.page';

const routes: Routes = [
  {
    path: '',
    component: EntryPlaceholderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryPlaceholderPageRoutingModule {}

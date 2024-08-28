import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryFormsPage } from './entry-forms.page';

const routes: Routes = [
  {
    path: '',
    component: EntryFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryFormsPageRoutingModule {}

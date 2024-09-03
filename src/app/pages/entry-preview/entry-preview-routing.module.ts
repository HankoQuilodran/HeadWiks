import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryPreviewPage } from './entry-preview.page';

const routes: Routes = [
  {
    path: '',
    component: EntryPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryPreviewPageRoutingModule {}

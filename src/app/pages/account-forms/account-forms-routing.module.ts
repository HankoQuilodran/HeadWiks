import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountFormsPage } from './account-forms.page';

const routes: Routes = [
  {
    path: '',
    component: AccountFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountFormsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnotationFormsPage } from './annotation-forms.page';

const routes: Routes = [
  {
    path: '',
    component: AnnotationFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnotationFormsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'folder',
    redirectTo: 'folder/MainPage',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'entries',
    loadChildren: () => import('./pages/entries/entries.module').then( m => m.EntriesPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'entry-forms',
    loadChildren: () => import('./pages/entry-forms/entry-forms.module').then( m => m.EntryFormsPageModule)
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./pages/admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'account-forms',
    loadChildren: () => import('./pages/account-forms/account-forms.module').then( m => m.AccountFormsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

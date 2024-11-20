import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
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
  },
  {
    path: 'annotation-forms',
    loadChildren: () => import('./pages/annotation-forms/annotation-forms.module').then( m => m.AnnotationFormsPageModule)
  },
  {
    path: 'entry-placeholder',
    loadChildren: () => import('./pages/entry-placeholder/entry-placeholder.module').then( m => m.EntryPlaceholderPageModule)
  },
  {
    path: 'entry-preview',
    loadChildren: () => import('./pages/entry-preview/entry-preview.module').then( m => m.EntryPreviewPageModule)
  },
  {
    path: 'entry-admin',
    loadChildren: () => import('./pages/entry-admin/entry-admin.module').then( m => m.EntryAdminPageModule)
  },
  {
    path: 'watch-user',
    loadChildren: () => import('./pages/watch-user/watch-user.module').then( m => m.WatchUserPageModule)
  },
  {
    path: 'watchuserpage2',
    loadChildren: () => import('./pages/watchuserpage2/watchuserpage2.module').then( m => m.Watchuserpage2PageModule)
  },
  {
    path: 'rec-password',
    loadChildren: () => import('./pages/rec-password/rec-password.module').then( m => m.RecPasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  }



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

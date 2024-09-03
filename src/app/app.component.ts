import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public appPages = [
    { title: 'Main Page', url: '/main-page', icon: 'grid' },
    { title: 'Account', url: '/account', icon: 'person' },
    { title: 'Make Entry', url: '/entry-forms', icon: 'create' },
    { title: 'moderator-Mode', url: '/admin-page', icon: 'build' },
    { title: 'Log Out', url: '', icon: 'power' },
  ];
  public labels = [];
  constructor() {}




}
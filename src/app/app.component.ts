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
    { title: 'Log Out', url: '/login', icon: 'power' },
  ];
  public labels = [];
  constructor() {}

}
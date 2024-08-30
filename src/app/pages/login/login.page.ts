import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario: String = "";
  correo: String = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.usuario,
        email: this.correo,
      }
    }

    this.router.navigate(['/main-page'], navigationextras);
  }




}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  usuario:String="";
  correo:String="";


  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.usuario,
        email: this.correo,
      }
    }

    this.router.navigate(['/account-forms'], navigationextras);
  }
}

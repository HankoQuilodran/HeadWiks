import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-account-forms',
  templateUrl: './account-forms.page.html',
  styleUrls: ['./account-forms.page.scss'],
})
export class AccountFormsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  usuario:String="";
  descrip:String="";



  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.usuario,
        desc: this.descrip,
      }
    }

    this.router.navigate(['/account'], navigationextras);
  }






}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-entry-forms',
  templateUrl: './entry-forms.page.html',
  styleUrls: ['./entry-forms.page.scss'],
})
export class EntryFormsPage implements OnInit {

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

    this.router.navigate(['/main-page'], navigationextras);
  }
}

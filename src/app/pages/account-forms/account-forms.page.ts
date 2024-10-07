import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account-forms',
  templateUrl: './account-forms.page.html',
  styleUrls: ['./account-forms.page.scss'],
})
export class AccountFormsPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  usuario:String="";


  validarDatos(){
    if((this.usuario=="")){
      this.alerta("Try again", "Username Box empty");
      return
    }
    else if((this.usuario.length < 5)){
      this.alerta("Try again", "Not enough characters on Username");
      return
    }
    else if((this.usuario.length > 20)){
      this.alerta("Try again", "Too many characters on Username");
      return
    }
    else {
      this.irPagina();
    }
  }

  async alerta(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Ok']

    });
    await alert.present();
  }





  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.usuario,
      }
    }

    this.router.navigate(['/account'], navigationextras);
  }

  





}

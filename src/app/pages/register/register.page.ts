import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  usuario:String="";
  correo:String="";
  contra1:String="";
  contra2:String="";


  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }





  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.usuario,
        email: this.correo,
        pass: this.contra1
      }
    }
    this.router.navigate(['/'], navigationextras);
  }

  validarDatos(){
    if((this.usuario=="") || (this.correo=="" ) || (this.contra1=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else if(this.usuario.length < 5){
      this.alerta("Try again", "Username must be at least 5 characters long");
      return
    }
    else if(this.contra1!=this.contra2){
      this.alerta("Try again", "Password confirmation error");
      return
    }
    else if(this.contra1.length < 8){
      this.alerta("Try again", "Password must be at least 8 characters long");
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



}

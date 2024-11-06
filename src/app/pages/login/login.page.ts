import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario: string = "";
  correo: string = "";
  contra: string = "";

  Verification:any;

  constructor(private router: Router, private activerouter: ActivatedRoute , private alertController: AlertController, private menuController: MenuController, private db:ServicebdService) { }

  ngOnInit() {
    this.menuController.enable(false, 'menuUniversal' );
  }

  Verificar(){
    this.Verification = this.db.LoginVerification(this.usuario, this.correo, this.contra);
    if(this.Verification){
      this.router.navigate(['/main-page']);
    }
    else{
      this.alerta("Try again", "incorrect data");
    }
  }

  validarDatos(){
    if((this.usuario=="") || (this.correo=="" ) || (this.contra=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else {
      this.validarLogin();
    }
  }

  validarLogin() {
    this.db.isDBReady.subscribe(async (val) => {
      //Validar que la base de datos esté lista
      if(val) {
        //Validar que el usuario exista y lo guarda en un Observable
        await this.db.LoginVerification(this.usuario, this.correo, this.contra);
        //Obtener el usuario actual
        this.db.fetchUsuarioActual().subscribe(res => {
          //Validar que el usuario exista (0 es el valor por defecto)
          if(res.user_id > 0) {
            this.router.navigate(['/main-page']);
          } 
          else {
            //Mostrar mensaje de error
            this.alerta("Autentication Error", "incorrect data");
          }
        });
      }
    });
  }



  



  async alerta(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Okay']

    });
    await alert.present();
  }




}

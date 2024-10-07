import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario: String = "";
  correo: String = "";
  contra: String = "";


  usuarioReg: String = "";
  correoReg: String = "";
  contraReg: String = "";

  constructor(private router: Router, private activerouter: ActivatedRoute , private alertController: AlertController, private menuController: MenuController) { 
    this.activerouter.queryParams.subscribe(param => {
      //validacion si en la navegacion existe la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioReg = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        this.correoReg = this.router.getCurrentNavigation()?.extras?.state?.['email'];
        this.contraReg = this.router.getCurrentNavigation()?.extras?.state?.['pass'];
      }
    })




  }

  ngOnInit() {
    this.menuController.enable(false, 'menuUniversal' );
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

  validarDatos(){
    if((this.usuario=="") || (this.correo=="" ) || (this.contra=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else if((this.usuario!= this.usuarioReg) || (this.correo!=this.correoReg ) || (this.contra!=this.contraReg)) {
      this.alerta("Try again", "No Registered data");
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
      buttons: ['Okay']

    });
    await alert.present();
  }




}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuarios: User[] = [];

  usuario:string="";
  correo:string="";
  contra1:string="";
  contra2:string="";


  constructor(private router: Router, private alertController: AlertController, private bd:ServicebdService, private menuController: MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, 'menuUniversal');
    this.bd.fetchUsers().subscribe(res=>{
      this.usuarios = res;
    })
  }


  async validarDatos(){
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/

    if((this.usuario=="") || (this.correo=="" ) || (this.contra1=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else if((this.correo.length < 10) && (!this.correo.includes("@") ) ) {
      this.alerta("Try again", "email not valid");
      return
    }
    else if(this.usuario.length < 5){
      this.alerta("Try again", "Username must be at least 5 characters long");
      return
    }
    else if(!regex.test(this.contra1)){
      this.alerta("Try again", "doesn't match with requirements");
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
      try {
        await this.bd.insertarUser(this.usuario, this.correo, this.contra1)
        this.alerta("lograd?", "se ha introducido exitosamente");
      } catch(error) {
        
        this.alerta("Error", "No se pudo registrar el usuario. Intenta nuevamente.");
      }
      
      
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

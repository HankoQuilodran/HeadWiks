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

  userNP!:boolean;
  emailNP!:boolean;
  passNP!:boolean;

  placeHolder:boolean = true;


  constructor(private router: Router, private alertController: AlertController, private bd:ServicebdService, private menuController: MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, 'menuUniversal');
    this.bd.fetchUsers().subscribe(res=>{
      this.usuarios = res;
    })
  }

  async ionViewWillEnter(){
    this.userNP = false;
    this.emailNP = false;
    this.passNP = false;
  }


  async validarDatos(){
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/
    //validar datos vacios
    if((this.usuario=="") || (this.correo=="" ) || (this.contra1=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }

    
    //validar correo
    const emailunico = await this.bd.emailUnico(this.correo);

    if((this.correo.length < 5) && (!this.correo.includes("@") ) ) {
      this.alerta("Try again", "email not valid");
      this.emailNP = false;
      return
    }
    else if(!emailunico){
      this.alerta("Try again", "Email Already registered");
      this.emailNP = false;
      return

    }
    else{
      this.emailNP = true;
    }

    
    //validar usuario
    const userUnico = await this.bd.usernameUnico(this.usuario);
    if((this.usuario.length < 5) || (this.usuario.length > 20)){
      this.alerta("Try again", "Wrong number of characters in Username");
      this.userNP = false;
      return
    }
    else if(!userUnico){
      this.alerta("Try again", "Username Already Exists");
      this.userNP = false;
      return

    }
    else{
      this.userNP = true;
    }

    //validar contraseña
    if(!regex.test(this.contra1)){
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
    else{
      this.passNP = true;
    }


    if(this.emailNP && this.userNP && this.passNP){
      try {
        
        await this.bd.insertarUser(this.usuario, this.correo, this.contra1)
        this.router.navigate(['/login']);
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

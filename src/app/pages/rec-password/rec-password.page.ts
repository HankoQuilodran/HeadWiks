import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ServiceemailService } from 'src/app/services/serviceemail.service';

@Component({
  selector: 'app-rec-password',
  templateUrl: './rec-password.page.html',
  styleUrls: ['./rec-password.page.scss'],
})
export class RecPasswordPage implements OnInit {

  User!:User;

  correo!:string;
  password!:string;

  usuarioExiste!: boolean;


  constructor(private router: Router, private alertController: AlertController, private db:ServicebdService, private menuController: MenuController, private emailsv:ServiceemailService) { }

  ngOnInit() {

  }
  
  async ionViewWillEnter(){
    this.usuarioExiste = false;
  }


  async validarDatos(){


    await this.db.buscarPassword(this.correo);


    await this.db.fetchUserBuscado().subscribe(data => {
      this.User = data;
      this.password = this.User.password;

      this.emailsv.enviarCorreo(this.correo, this.password).subscribe(RESPONSE => {
        this.alerta("RESPONSE", JSON.stringify(RESPONSE))
      });
    });

    this.router.navigate(["/login"])
    


  }


  async rescatarPassword(){
    this.db.fetchUserBuscado().subscribe(data => {
      this.User = data;
      this.password = this.User.password;
    });
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

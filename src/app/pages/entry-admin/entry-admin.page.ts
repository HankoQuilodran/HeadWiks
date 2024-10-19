import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-entry-admin',
  templateUrl: './entry-admin.page.html',
  styleUrls: ['./entry-admin.page.scss'],
})
export class EntryAdminPage implements OnInit {

  Ereport: string = "";
  Areport: string = "";
  author: string = "";



  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  ValidarEDelete() {
    if(this.Ereport==""){
      this.alerta("Try again", "Entry Report box should not be left empty");
      return
    }
    else {
      
    }
  }

  ValidarADelete() {
    if(this.Areport==""){
      this.alerta("Try again", "Annotation Report box should not be left empty");
      return
    }
    else {
      
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

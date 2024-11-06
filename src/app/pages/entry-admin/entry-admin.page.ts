import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {Entry} from 'src/app/classes/entry'
import { ServicebdService } from 'src/app/services/servicebd.service';
@Component({
  selector: 'app-entry-admin',
  templateUrl: './entry-admin.page.html',
  styleUrls: ['./entry-admin.page.scss'],
})
export class EntryAdminPage implements OnInit {

  entrada!: Entry;
  user_id!: number;

  Ereport: string = "";
  Areport: string = "";
  author: string = "";



  constructor(private router: Router, private alertController: AlertController, private db:ServicebdService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.actualEntryInfo();
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

  async IrAutor(){
    await this.db.buscarUser(this.user_id);
    this.router.navigate(['/watch-user']);
  }

  actualEntryInfo(){
    this.db.fetchEntradaActual().subscribe(data => {
      
      this.entrada = data;
      this.user_id = this.entrada.user_id;
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

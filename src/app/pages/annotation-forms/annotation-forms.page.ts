import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { User } from 'src/app/classes/user';
import {Entry} from 'src/app/classes/entry'

@Component({
  selector: 'app-annotation-forms',
  templateUrl: './annotation-forms.page.html',
  styleUrls: ['./annotation-forms.page.scss'],
})
export class AnnotationFormsPage implements OnInit {

  registeredUser!: User;
  entrada!: Entry;


  title:string="";
  content:string="";

  regUserId!: number;
  regEntryId!: number;


  constructor(private router: Router, private alertController: AlertController, private db:ServicebdService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.RegUserInfo();
    this.actualEntryInfo();
  }




  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      this.registeredUser = data;
      this.regUserId =this.registeredUser.user_id;
    });
  }

  actualEntryInfo(){
    this.db.fetchEntradaActual().subscribe(data => {
      this.entrada = data;
      this.regEntryId = this.entrada.entry_id;
    });
  }


  
  validarDatos(){
    if((this.title=="") || (this.content=="" )){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else{
      this.insertarAnotacion();
    }
  }

  async insertarAnotacion(){
    //creamos variable de contexto
    
    await this.db.insertarAnnotation(this.regEntryId, this.regUserId, this.title, this.content);
    this.router.navigate(['/entries']);
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

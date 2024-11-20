import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Annotation } from 'src/app/classes/annotation';
import {Entry} from 'src/app/classes/entry'
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ServiceemailService } from 'src/app/services/serviceemail.service';
@Component({
  selector: 'app-entry-admin',
  templateUrl: './entry-admin.page.html',
  styleUrls: ['./entry-admin.page.scss'],
})
export class EntryAdminPage implements OnInit {

  anotaciones: Annotation[] = [];

  User!:User;
  registeredUser!: User;
  regRoleId!: number;

  Username!: string;
  email!: string;

  entrada!: Entry;
  user_id!: number;
  entry_id!: number;
  admin!: boolean;

  Ereport: string = "";
  author: string = "";



  constructor(private router: Router, private alertController: AlertController, private db:ServicebdService, private emailsv:ServiceemailService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.RegUserInfo()   
    this.UserInfo();
    this.actualEntryInfo();
    this.esAdmin();
    await this.db.fetchAnnotations().subscribe(res=>{
      this.anotaciones = res;
    })
  }


  esAdmin(){
    if(this.regRoleId == 2){
      this.admin = true;
    }
    else{
      this.admin = false;
    }
  }

  ValidarEDelete() {
    if(this.Ereport==""){
      this.alerta("Try again", "Entry Report box should not be left empty");
      return
    }
    else {

      this.desactivarEntry()
    }
  }

  async IrAutor(){
    await this.db.buscarUser(this.user_id);
    this.router.navigate(['/watch-user']);
  }



  actualEntryInfo(){
    this.db.fetchEntradaActual().subscribe(data => {
      
      this.entrada = data;
      this.entry_id = this.entrada.entry_id;
      this.user_id = this.entrada.user_id;
    });
  }

  UserInfo(){
    this.db.fetchUserBuscado().subscribe(data => {
      this.User = data;
      this.email = this.User.email;
      this.Username = this.User.username;
    });
  }

  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      this.registeredUser = data;
      this.regRoleId = this.registeredUser.role_id;
    });
  }



  async desactivarEntry(){
    await this.db.desactivarEntry(this.entrada.entry_id);

    this.emailsv.enviarReporte(this.email, this.Ereport).subscribe(RESPONSE => {
      this.alerta("RESPONSE", JSON.stringify(RESPONSE))
    });

    this.router.navigate(['/main-page']);
  }

  async desactivarAnnotation(Annotation_id:number){
    await this.db.desactivarAnotation(Annotation_id, this.entry_id);
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertController } from '@ionic/angular';
import {Entry} from 'src/app/classes/entry'
import { Annotation } from 'src/app/classes/annotation';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {

  entrada!: Entry;
  usuarioBuscado!: User;
  anotaciones: Annotation[] = [];

  registeredUser!: User;
  regUserId!: number;
  regRoleId!: number;

  username!: string;
  entry_id!: number;
  autor_id!: number;
  entry_title!: string;
  entry_content!: string;
  sources!: string;
  tags!: string;
  imagen: any;
  creation_date: any;


  Autor!: boolean;

  like:boolean=false;
  follow:boolean=false;


  constructor(private router: Router, private activerouter: ActivatedRoute, private db:ServicebdService, private alertController: AlertController) {}

  ngOnInit() {

  }

  async ionViewWillEnter(){
    await this.actualEntryInfo();
    await this.usernameGet();

    await this.RegUserInfo();
    await this.esAutor();
    await this.esAdmin();

    await this.db.fetchAnnotations().subscribe(res=>{
      this.anotaciones = res;
    })
    
  }

  
  esAutor(){
    if(this.autor_id == this.regUserId){
      this.Autor = true;
    }
    else{
      this.Autor = false;
    }
  }

  esAdmin(){
    if(this.regRoleId == 2){
      this.Autor = true;
    }
  }

  actualEntryInfo(){
    this.db.fetchEntradaActual().subscribe(data => {
      
      this.entrada = data;
      this.entry_id = this.entrada.entry_id;
      this.autor_id = this.entrada.user_id;
      this.entry_title = this.entrada.entry_title;
      this.entry_content = this.entrada.entry_content;
      this.sources = this.entrada.sources;
      this.imagen = this.entrada.image;
      this.creation_date = this.entrada.creation_date;
    });
  }

  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      this.registeredUser = data;
      this.regUserId =this.registeredUser.user_id;
      this.regRoleId = this.registeredUser.role_id;
    });
  }

  usernameGet(){
    this.db.fetchUserBuscado().subscribe(data =>{
      this.usuarioBuscado = data;

      this.username = this.usuarioBuscado.username;

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

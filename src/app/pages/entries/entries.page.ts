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

  username!: string;
  entry_id!: number;
  user_id!: number;
  entry_title!: string;
  entry_content!: string;
  sources!: string;
  tags!: string;
  imagen: any;
  creation_date: any;

  like:boolean=false;
  follow:boolean=false;


  constructor(private router: Router, private activerouter: ActivatedRoute, private db:ServicebdService, private alertController: AlertController) {}

  ngOnInit() {
    this.db.fetchAnnotations().subscribe(res=>{
      this.anotaciones = res;
    })
  }

  async ionViewWillEnter(){
    this.actualEntryInfo();
    this.usernameGet();
  }
  

  actualEntryInfo(){
    this.db.fetchEntradaActual().subscribe(data => {
      
      this.entrada = data;
      this.entry_id = this.entrada.entry_id;
      this.user_id = this.entrada.user_id;
      this.entry_title = this.entrada.entry_title;
      this.entry_content = this.entrada.entry_content;
      this.sources = this.entrada.sources;
      this.imagen = this.entrada.image;
      this.creation_date = this.entrada.creation_date;
    });
  }

  usernameGet(){
    this.db.fetchUserBuscado().subscribe(data =>{
      this.usuarioBuscado = data;

      this.username = this.usuarioBuscado.username;

    });
  }

  likeEntry(){
    if(!this.like) {
      this.like = true;
    }
    else{
      this.like = false;
    }
  }

  followEntry(){
    if(!this.follow) {
      this.follow = true;
    }
    else{
      this.follow = false;
    }
  }




}

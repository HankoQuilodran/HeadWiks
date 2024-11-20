import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-entry-preview',
  templateUrl: './entry-preview.page.html',
  styleUrls: ['./entry-preview.page.scss'],
})
export class EntryPreviewPage implements OnInit {

  registeredUser!:User;
  regUsername!: string;
  regUserId!: number;

  like:boolean=false;
  follow:boolean=false;

  titulo:string="";
  tags:string="";
  resumen:string="";
  contenido:string="";
  fuentes:string=""; 
  imagen: any;

  constructor(private router: Router, private activerouter: ActivatedRoute, private db:ServicebdService, private alertController: AlertController) { 
    this.activerouter.queryParams.subscribe(param => {
      //validacion si en la navegacion existe la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['title'];
        this.tags = this.router.getCurrentNavigation()?.extras?.state?.['tag'];
        this.resumen = this.router.getCurrentNavigation()?.extras?.state?.['briefing'];
        this.contenido = this.router.getCurrentNavigation()?.extras?.state?.['content'];
        this.fuentes = this.router.getCurrentNavigation()?.extras?.state?.['sources'];
        this.imagen = this.router.getCurrentNavigation()?.extras?.state?.['image'];
      }
    });
  }

  ngOnInit() {
    this.RegUserInfo();
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

  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      this.registeredUser = data;
      this.regUsername = this.registeredUser.username;
      this.regUserId =this.registeredUser.user_id;
    });
  }

  

  async entryInsert(){
    await this.db.insertarEntry(this.regUserId, this.titulo, this.contenido, this.resumen, this.imagen, this.fuentes )
    this.router.navigate(['/main-page']);
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

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Entry } from 'src/app/classes/entry';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  id_entry!: number;

  registeredUser!: User;
  roleid!: number;

  entries: Entry[] = [];



  constructor(private menucontroller: MenuController, private router: Router, private alertController: AlertController, private db:ServicebdService) { }

  ngOnInit() {
    this.RegUserInfo();
    this.menucontroller.enable(true, 'menuUniversal' );

    this.db.fetchEntry().subscribe(res=>{
      this.entries = res;
    })
    
  }


  async alerta(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Okay']

    });
    await alert.present();
  }



  async irEntry(Entryid:number, UserId:number){
    try{

      await this.db.EntradaActual(Entryid)
      await this.db.buscarUser(UserId)

      try{
        await this.db.seleccionarAnnotation(Entryid)
      }catch{
        this.alerta("error al seleccionar anotacion", "cuidao");
      }


      
      this.router.navigate(['/entries']);

    }catch{
      this.alerta("error entrada actual", "cuidao");
    }
  }

  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      
      this.registeredUser = data;
      this.roleid = this.registeredUser.role_id;
    });
  }


}

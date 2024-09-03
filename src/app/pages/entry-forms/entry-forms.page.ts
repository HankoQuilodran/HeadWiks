import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-entry-forms',
  templateUrl: './entry-forms.page.html',
  styleUrls: ['./entry-forms.page.scss'],
})
export class EntryFormsPage implements OnInit {


  titulo:String="";
  tags:String="";
  resumen:String="";
  contenido:String="";
  fuentes:String="";


  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }


  


  validarDatos(){
    if((this.titulo=="") || (this.tags=="" ) || (this.resumen=="") || (this.contenido=="") || (this.fuentes=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else {
      this.irPagina();
    }
  }





  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        title: this.titulo,
        tag: this.tags,
        briefing: this.resumen,
        content: this.contenido,
        sources: this.fuentes,
      }
    }

    this.router.navigate(['/entry-preview'], navigationextras);
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

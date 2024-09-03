import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-annotation-forms',
  templateUrl: './annotation-forms.page.html',
  styleUrls: ['./annotation-forms.page.scss'],
})
export class AnnotationFormsPage implements OnInit {


  title:String="";
  content:String="";

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }


  validarDatos(){
    if((this.title=="") || (this.content=="" )){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else{
      this.irPagina();
    }
  }

  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.title,
        email: this.content,
      }
    }
    this.router.navigate(['/entries'], navigationextras);
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

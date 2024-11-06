import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-entry-forms',
  templateUrl: './entry-forms.page.html',
  styleUrls: ['./entry-forms.page.scss'],
})
export class EntryFormsPage implements OnInit {

  imagen: any = "/assets/PlaceHolders/mountain_PH.png";

  titulo:string="";
  tags:string="";
  resumen:string="";
  contenido:string="";
  fuentes:string="";


  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }


  


  validarDatos(){
    if((this.titulo=="") || (this.tags=="" ) || (this.resumen=="") || (this.contenido=="") || (this.fuentes=="") || (this.imagen=="")){
      this.alerta("Try again", "No box should be left empty");
      return
    }
    else {
      this.irPagina();
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagen = image.webPath;
  
    
  };




  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        title: this.titulo,
        tag: this.tags,
        briefing: this.resumen,
        content: this.contenido,
        sources: this.fuentes,
        image: this.imagen
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

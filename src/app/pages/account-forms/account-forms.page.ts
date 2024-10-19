import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-account-forms',
  templateUrl: './account-forms.page.html',
  styleUrls: ['./account-forms.page.scss'],
})
export class AccountFormsPage implements OnInit {

  usuario:String="";

  imagen: any;



  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  


  validarDatos(){
    if((this.usuario=="")){
      this.alerta("Try again", "Username Box empty");
      return
    }
    else if((this.usuario.length < 5)){
      this.alerta("Try again", "Not enough characters on Username");
      return
    }
    else if((this.usuario.length > 20)){
      this.alerta("Try again", "Too many characters on Username");
      return
    }
    else {
      this.irPagina();
    }
  }

  async alerta(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Ok']

    });
    await alert.present();
  }





  irPagina(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.usuario,
      }
    }

    this.router.navigate(['/account'], navigationextras);
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




}

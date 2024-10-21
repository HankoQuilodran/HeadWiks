import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-account-forms',
  templateUrl: './account-forms.page.html',
  styleUrls: ['./account-forms.page.scss'],
})
export class AccountFormsPage implements OnInit {

  usuarioEdit:string="";

  imagen: any;


  registeredUser!:User;
  regUsername!: string;
  regUserId!: any;
  regProfilePic: any;


  defaultImage: any ="/assets/PlaceHolders/profile_PH.jpg";
  profilePicString!: string;

  constructor(private router: Router, private alertController: AlertController, private db:ServicebdService) { 
    
  }

  async ionViewWillEnter(){
    this.RegUserInfo();
    this.setDefaultImage();
    this.unsetDefaultImage();
  }


  ngOnInit() {
  }

  


  validarDatos(){
    if((this.usuarioEdit=="")){
      this.alerta("Try again", "Username Box empty");

      return
    }
    else if((this.usuarioEdit.length < 5)){
      this.alerta("Try again", "Not enough characters on Username");
      return
    }
    else if((this.usuarioEdit.length > 20)){
      this.alerta("Try again", "Too many characters on Username");
      return
    }
    else {
      this.db.modificarUserUsername(this.regUserId, this.usuarioEdit)
      this.db.modificarUserImage(this.regUserId, this.imagen)
      this.alerta("Done Correctly", "Username and or Profile Pic modified");
      this.router.navigate(['/account']);
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


  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      
      this.registeredUser = data;
      this.regUserId = this.registeredUser.user_id;
      this.regUsername = this.registeredUser.username;
      this.regProfilePic = this.registeredUser.profile_picture;
    });
  }


  unsetDefaultImage(){
    if(this.regProfilePic){
      this.imagen = this.regProfilePic;
    }
  }

  setDefaultImage(){
    if(!this.imagen){
      this.imagen = this.defaultImage;
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




}

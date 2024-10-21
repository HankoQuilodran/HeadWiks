import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  registeredUser!:User;
  regUsername!: string;
  regProfilePic: any;
  UsedProfilePic: any ="/assets/PlaceHolders/profile_PH.jpg";
  profilePicString!: string;
  constructor(private router: Router, private activerouter: ActivatedRoute, private db:ServicebdService ) { 
    //lo primero es conseguir la info del usuario que se registró
    
  }



  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.RegUserInfo();
    this.unsetDefaultImage();
    
  }

  //conseguimos info del usuario que se registró
  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      this.registeredUser = data;
      this.regUsername = this.registeredUser.username;
      this.regProfilePic = this.registeredUser.profile_picture;
    });
    this.profilePicString = (typeof this.regProfilePic).toString();
  }
  
  unsetDefaultImage(){
    if(this.regProfilePic){
      this.UsedProfilePic = this.regProfilePic;
    }
  }



}

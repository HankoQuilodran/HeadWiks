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

  regUserId!: number;
  registeredUser!:User;
  regUsername!: string;
  regProfilePic: any;
  UsedProfilePic: any ="/assets/PlaceHolders/profile_PH.jpg";
  profilePicString!: string;
  regRoleId!: number;

  entryCount!: number;
  annotationCount!: number;

  constructor(private router: Router, private activerouter: ActivatedRoute, private db:ServicebdService ) { 

    
  }


  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.RegUserInfo();
    this.unsetDefaultImage();
    this.getCounts()
    
    
  }

  async getCounts(){
    this.entryCount = await this.db.countEntries(this.regUserId);
    this.annotationCount = await this.db.countAnnotations(this.regUserId);
  }

  //conseguimos info del usuario que se registró
  RegUserInfo(){
    this.db.fetchUsuarioActual().subscribe(data => {
      this.registeredUser = data;
      this.regUserId = this.registeredUser.user_id;
      this.regUsername = this.registeredUser.username;
      this.regProfilePic = this.registeredUser.profile_picture;
      this.regRoleId = this.registeredUser.role_id;
    });
    this.profilePicString = (typeof this.regProfilePic).toString();
  }
  
  unsetDefaultImage(){
    if(this.regProfilePic){
      this.UsedProfilePic = this.regProfilePic;
    }
  }



}

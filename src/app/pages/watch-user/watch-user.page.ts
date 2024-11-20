import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NumericValueAccessor } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
@Component({
  selector: 'app-watch-user',
  templateUrl: './watch-user.page.html',
  styleUrls: ['./watch-user.page.scss'],
})
export class WatchUserPage implements OnInit {


  User!:User;

  UserId!:number;

  Username!: string;
  ProfilePic: any;
  UsedProfilePic: any ="/assets/PlaceHolders/profile_PH.jpg";
  profilePicString!: string;


  UserRole!: number;
  UserState!: string;

  entryCount!: number;
  annotationCount!: number;

  constructor(private router: Router, private activerouter: ActivatedRoute, private db:ServicebdService ) { 

    
  }


  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.UserInfo();
    this.unsetDefaultImage();
    this.accountState();
    this.getCounts()
  }

  //conseguimos info del usuario que se registró
  UserInfo(){
    this.db.fetchUserBuscado().subscribe(data => {
      this.User = data;
      this.UserId = this.User.user_id;
      this.Username = this.User.username;
      this.ProfilePic = this.User.profile_picture;
      this.UserRole = this.User.role_id;
    });
  }
  
  unsetDefaultImage(){
    if(this.ProfilePic){
      this.UsedProfilePic = this.ProfilePic;
    }
  }

  accountState(){
    if(this.UserRole == 1){
      this.UserState = "usuario";
    }else if(this.UserRole == 2){
      this.UserState = "moderador";
    }else if(this.UserRole == 0){
      this.UserState = "Desactivado";
    }
  }


  deactivateAccount(){
    this.db.desactivarUser(this.UserId)
    this.router.navigate(['/main-page']);
  }

  upgradeAccount(){
    this.db.modificarUserRole(this.UserId);
    this.accountState();
    this.router.navigate(['/main-page']);
  }


  async getCounts(){
    this.entryCount = await this.db.countEntries(this.UserId);
    this.annotationCount = await this.db.countAnnotations(this.UserId);
  }

}
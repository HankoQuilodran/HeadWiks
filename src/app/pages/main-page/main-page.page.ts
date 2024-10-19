import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  id_entry!: number;



  constructor(private menucontroller: MenuController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'menuUniversal' );
  }






  irEntry(){
    //creamos variable de contexto
    let navigationextras: NavigationExtras = {
      state: {
        user: this.id_entry,
      }
    }
    this.router.navigate(['/entries'], navigationextras);
  }



}

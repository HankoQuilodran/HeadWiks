import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {


  usuario:string="Username";
  descrip:string="an inspiring description";


  constructor(private router: Router, private activerouter: ActivatedRoute ) { 
    this.activerouter.queryParams.subscribe(param => {
      //validacion si en la navegacion existe la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        this.descrip = this.router.getCurrentNavigation()?.extras?.state?.['desc'];
      }
    })

  }



  ngOnInit() {
  }


  



}

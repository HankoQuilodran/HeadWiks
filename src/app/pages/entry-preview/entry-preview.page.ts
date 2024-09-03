import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-entry-preview',
  templateUrl: './entry-preview.page.html',
  styleUrls: ['./entry-preview.page.scss'],
})
export class EntryPreviewPage implements OnInit {



  like:boolean=false;
  follow:boolean=false;

  titulo:String="";
  tags:String="";
  resumen:String="";
  contenido:String="";
  fuentes:String=""; 

  constructor(private router: Router, private activerouter: ActivatedRoute ,) { 
    this.activerouter.queryParams.subscribe(param => {
      //validacion si en la navegacion existe la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['title'];
        this.tags = this.router.getCurrentNavigation()?.extras?.state?.['tag'];
        this.resumen = this.router.getCurrentNavigation()?.extras?.state?.['briefing'];
        this.contenido = this.router.getCurrentNavigation()?.extras?.state?.['content'];
        this.fuentes = this.router.getCurrentNavigation()?.extras?.state?.['sources'];
      }
    });
  }

  ngOnInit() {
  }






  likeEntry(){
    if(!this.like) {
      this.like = true;
    }
    else{
      this.like = false;
    }
  }

  followEntry(){
    if(!this.follow) {
      this.follow = true;
    }
    else{
      this.follow = false;
    }
  }


  



}

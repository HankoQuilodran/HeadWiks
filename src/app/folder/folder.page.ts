import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  usuario: String= "";
  correo: String= "";



  constructor(private router: Router, private activerouter: ActivatedRoute) { 
    this.activerouter.queryParams.subscribe(param => {
      //validacion si en la navegacion existe la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.['email'];
      }
    })
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}

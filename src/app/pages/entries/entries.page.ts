import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {






  entry_id!: number;
  

  entry_title!: string;
  entry_content!: string;
  image: any;
  sources!: string;
  




  like:boolean=false;
  follow:boolean=false;


  constructor() { }

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

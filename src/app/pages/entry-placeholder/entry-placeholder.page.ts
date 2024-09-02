import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-placeholder',
  templateUrl: './entry-placeholder.page.html',
  styleUrls: ['./entry-placeholder.page.scss'],
})
export class EntryPlaceholderPage implements OnInit {


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

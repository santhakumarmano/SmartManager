import { Component, OnInit, EventEmitter, Output, Inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//  import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //  template:`<app-loginreg (notifyParent)='getNotification($event)'></app-loginreg>`,
  styleUrls: ['./app.component.sass']
})


export class AppComponent implements OnInit {

  constructor(private route: Router) { }


  ngOnInit() {

  }


}

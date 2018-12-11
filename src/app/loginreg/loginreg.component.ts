/* tslint:disable */
import { Component, OnInit, EventEmitter, Output, Inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { importExpr } from '@angular/compiler/src/output/output_ast';

// services
import { LoginregService } from './loginreg.service';
import { Response } from '@angular/http';
import { SessionStorageService } from "ngx-webstorage";
import $ from 'jquery';

declare var jquery:any;
declare var $ :any;
//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css'],
  providers: [LoginregService]
})
export class LoginregComponent implements OnInit {

  constructor(private route: Router, private loginregservice: LoginregService
    ,public session: SessionStorageService) { }
//,public session: SessionStorageService
  ngOnInit() {

  }
  

  login = [];
  regis = [];

  public register = false;
  public regFillMantatory = false;
  // register details
  regesdet = [];
  message:string;
  registerdetails(regisdet) {
    if ( regisdet.groupid != null && regisdet.businessid != null && regisdet.username != null && regisdet.password != null
      && regisdet.confpassword != null && regisdet.mobileNo != null && regisdet.email != null) {
      this.regFillMantatory = false;
      this.loginregservice.registerDetails(regisdet)
        .subscribe((resp: any) => {
          if (resp.ServiceStatus == "Success") {
            this.regesdet = resp;
          this.session.store("business_id", resp.businessid);
          // $('#myModal').modal('show');
          // this.message=resp.business_id;
            this.register = false
            this.login = [];
            this.regis = [];
          }

        });
    } else {
      this.regFillMantatory = true;
    }

  }

  // login details
  logidetailsdata: any;
  loginFieldErrorFlag = false;
  userPasswrdFailure=false;
  logindetails(logindet) {

    //  this.route.navigate(['menu']);

    if (logindet.businessid != null && logindet.username != null && logindet.password != null) {
      this.loginFieldErrorFlag = false;
      this.loginregservice.loginDetails(logindet)
        .subscribe((Response: any) => {
          this.logidetailsdata = Response;
          if (Response.ServiceStatus == 'Success') {
            this.session.store("business_id",logindet.businessid);
            this.session.store("username",Response.user_name);
            this.session.store("Session","loggingin");
            if(this.session.retrieve("Session") != "loggedout"){
              this.route.navigate(['menu']);
            }
            
            this.login = [];
            this.regis = [];
          }else if(Response.ServiceStatus == 'Failure'){
          this.userPasswrdFailure=true;
          }

        });
    } else {
      this.loginFieldErrorFlag = true;
    }
  }

  //email validation
  emailvali=false;
  emailvalidate(contactemail){
 if(contactemail.errors!=null){
   this.emailvali=true;
  }else {
    this.emailvali=false;
  }
  }


  //business validation
  businessvali=false;
  businessvalidate(contactbusiness){
 if(contactbusiness.errors!=null){
   this.businessvali=true;
  }else {
    this.businessvali=false;
  }
  }
}

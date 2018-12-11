import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { SessionStorageService } from 'ngx-webstorage';
import { MenusService } from './menus.service';

// declare var $:any;
/* tslint:disable */
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
  providers:[MenusService]
})
export class MenusComponent implements OnInit {

  constructor(private menuservice:MenusService,private router: Router, private route: ActivatedRoute ,public session: SessionStorageService) { 
   
  }

  public dasharrowflag = true;
  public reservationarrowflag = false;
  public ratesavailarrowflag = false;
  public promotionsarrowflag = false;
  public policyarrowflag = false;
  public configurationsarrowflag = false;
  public reportsarrowflag =false;
  public toolbar:any;
  public name:any=this.session.retrieve("username");
  public Reservation;
  public cancel;
  public modify;
  public smscount;

  public interval:any;
  ngOnInit() {
    // setTimeout(function(){
    //   this.toolbardata();
    // },10000)
    this.interval=setInterval(() => this.toolbardata(),300000);
    this.toolbardata();
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  toolbardata(){
    this.menuservice.dashBoardToolbar()
    .subscribe((resp:any) =>{
      if(resp.Return_code == "Success"){
        this.toolbar = resp.Return_value;
        this.Reservation=this.toolbar.reservation;
        this.cancel=this.toolbar.cancel;
        this.modify=this.toolbar.modify;
        this.smscount=this.toolbar.Sms_count;
        console.log("2) Toolbar service -", this.toolbar);
      }
    });
  }

  dashboardtab() {
    this.router.navigate(['dashboard'], { relativeTo: this.route });
    this.dasharrowflag = true;
    this.reservationarrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }
  reservation() {
    this.router.navigate(['reservation'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.reservationarrowflag = true;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }
  ratesAvailtab() {
    this.router.navigate(['roomtypes'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.reservationarrowflag = false;
    this.ratesavailarrowflag = true;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }
  promotionstab() {
    this.router.navigate(['promotions'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = true;
    this.policyarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }

  cancellationtab() {
    this.router.navigate(['cancellationpaymentComponent'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = true;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }

  // configuration
  configuration() {
    this.router.navigate(['configuration'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.configurationsarrowflag = true;
    this.reportsarrowflag =false;
  }
  //reports
  Reports() {
    this.router.navigate(['Reports'], { relativeTo: this.route });
    this.reportsarrowflag =false;
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =true;
  }

  // sign out function

  signout() {
    this.session.clear();
    this.session.store("Session","loggedout");
    this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }
}
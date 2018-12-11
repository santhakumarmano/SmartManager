/* tslint:disable */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import {DatePipe} from '@angular/common';
// import { StorageServiceModule } from 'ngx-webstorage-service';
// import { MessageService } from './app.commonservice';
import { Ng2Webstorage } from "ngx-webstorage";

import $ from 'jquery';

//common service for render
//import { GlobalService } from './MySharedService';
import { AppComponent } from './app.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenusComponent } from './menus/menus.component';
// jquerys
import { PromotionsComponent } from './promotions/promotions.component';
//custom date format
import { NgbDateCustomParserFormatter } from "./customdateformat";

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CancellationpaymentComponent } from './cancellationpayment/cancellationpayment.component';
import { RoomtypesComponent } from './roomtypes/roomtypes.component'

// date picker
import { NgbModule ,NgbDateStruct,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationComponent } from './configuration/configuration.component';
//roports

import { ChartsModule } from 'ng2-charts';
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
// Include Below Snippet
FusionChartsModule.fcRoot(FusionCharts, );
// import { SocialShareModule } from 'social-share-ng2';
// import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { Angular2SocialLoginModule} from "angular2-social-login";
import { UiSwitchModule } from 'ngx-toggle-switch';
// services\
import { CommonService } from './common.service';
import { LoginregService } from '../app/loginreg/loginreg.service';
import { RoomTypeService } from "../app/roomtypes/roomtypes.service";
import { PrmotionsService } from "../app/promotions/promotions.service";
import { CancellationpaymentService } from "../app/cancellationpayment/cancellationpayment.service";
import { ReportsComponent } from './reports/reports.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FilterdataPipe } from './filterdata.pipe';
import { ToasterService } from './toaster.service';
import { UniquePipe } from './unique.pipe';
import { SortdatePipe } from './sortdate.pipe';

export const appRoutes: Routes = [
  { path: 'appcom', component: AppComponent },
  { path: 'login', component: LoginregComponent },
  
  {
    path: 'menu', component: MenusComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path:'reservation',
      component:ReservationComponent
    },
    {
      path: 'promotions',
      component: PromotionsComponent
    },
    {
      path: 'cancellationpaymentComponent',
      component: CancellationpaymentComponent
    },
    {
      path: 'roomtypes',
      component: RoomtypesComponent
    },
    {
      path: 'configuration',
      component: ConfigurationComponent
    },
    {
       path:'Reports',
       component:ReportsComponent
    }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

let socialloginproviders = {

"facebook":{
  "clientID":"170065467203111",
  "apiVersion":"v3.1"
}

};
@NgModule({
  declarations: [
    AppComponent,
    LoginregComponent,
    DashboardComponent,
    MenusComponent,
    PromotionsComponent,
    CancellationpaymentComponent,
    RoomtypesComponent,
    ConfigurationComponent,
    ReportsComponent,
    ReservationComponent,
    FilterdataPipe,
    UniquePipe,
    SortdatePipe,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AmChartsModule,
    Ng2Webstorage,
    ChartsModule,
    FusionChartsModule,
    Angular2SocialLoginModule,
    UiSwitchModule
    

  ],
  providers: [CommonService, LoginregService,RoomTypeService,PrmotionsService,DatePipe, 
    CancellationpaymentService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

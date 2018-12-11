/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass,DatePipe  } from '@angular/common';
import {PrmotionsService} from "./promotions.service";
import { SessionStorageService } from "ngx-webstorage";
// date picker
import { NgbModule ,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//custom date format
import { NgbDateCustomParserFormatter} from "../customdateformat";
import $ from 'jquery';
import { format } from 'url';
//import {isNumber,padNumber,toInteger} from 'utilss/util';
declare var jquery:any;
declare var $ :any;


//import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';


const now = new Date();
//const config = new NgbDateCustomParserFormatter();
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
  providers: [PrmotionsService,NgbDateCustomParserFormatter]
})




export class PromotionsComponent implements OnInit {

  constructor(private prmotionsService:PrmotionsService  ,public session: SessionStorageService,
    private datePipe: DatePipe,
  private dateFormate:NgbDateCustomParserFormatter) { }
    prom={};
  getroomdetails=[];
  getroomdetail=[];
  getpromotionsdetail=[];
  getroomslist=[];
 // chdate:NgbDateStruct;


 
 

 NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  chdate: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  minDate: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  ngOnInit() {
    this.dateFormate.format(this.chdate);
    // get dash board details
let dasParms={
  "business_id":this.session.retrieve("business_id"),
  "available_date":this.datePipe.transform(new Date(), 'yyyy-MM-dd')
}
  this.prmotionsService.dashboardDetails(dasParms)
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        this.getroomdetail=resp.Available_Rooms;

        for(var i=0;i< this.getroomdetail.length;i++){
        this.getroomdetails.push({
                           'check' :false,
                           'room_type':this.getroomdetail[i].room_type
        });
      }

      }

    });

    //get promotion details if available
   // tdyDate=new Date();//this.datePipe.transform(new Date(), 'yyyy-MM-dd')
 
  //  this.chdate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()-1}
  }
public showDiscountPage=false;
  public basicFlag = false;
  public limitedFlag = false;
  public earlyFlag = false;
  public lastminFlag = false;

  public promotionsType:String;

  //  basic deal
  basicdeal() {
    if (this.basicFlag == false) {
      this.promotionsType="Basic Deal";
      this.basicFlag = true;
      this.limitedFlag = false;
      this.earlyFlag = false;
      this.lastminFlag = false;
    } else {
      this.basicFlag = false;
    }
  }

  //  last min deal
  lastmindeal() {
    if (this.lastminFlag == false) {
      this.promotionsType="Last Minute";
      this.lastminFlag = true;
      this.basicFlag = false;
      this.earlyFlag = false;
      this.limitedFlag = false;
    } else {
      this.lastminFlag = false;
    }
  }

  //  early deal
  earlydeal() {
    if (this.earlyFlag == false) {
      this.promotionsType="Early Booker";
      this.earlyFlag = true;
      this.basicFlag = false;
      this.limitedFlag = false;
      this.lastminFlag = false;
    } else {
      this.earlyFlag = false;
    }
  }

  //  limiteddeal
  limiteddeal() {
    if (this.limitedFlag == false) {
      this.promotionsType="Limited time Deal";
      this.limitedFlag = true;
      this.basicFlag = false;
      this.lastminFlag = false;
      this.earlyFlag = false;
    } else {
      this.limitedFlag = false;
    }
  }

  oushcheckedRomms(index,ch,val){
    if(val==true){
    this.getroomslist.push(ch);
    this.getroomdetails[index].check=val;
    }else{
      this.getroomslist.splice(index,1);
      this.getroomdetails[index].check=val;
    }
console.log(ch);
  }


  //get discount data
  getDiscountData(){
    this.showDiscountPage=true;
    let prmotionsParms={
      "business_id":this.session.retrieve("business_id"),
    "room_date":this.chdate.year+'-'+this.chdate.month+'-'+this.chdate.day//this.datePipe.transform(new Date(), 'yyyy-MM-dd') //"2018-05-12" whatever format you need.,
    }
      this.prmotionsService.prmoDetails(prmotionsParms)
        .subscribe((resp: any) => {
          if (resp.ServiceStatus == 'Success') {
            this.getpromotionsdetail=resp.Result;
            if(this.getpromotionsdetail[0].room_type!=undefined){
            this.getroomslist=this.getpromotionsdetail[0].room_type;
            }
            this.promotionsType=this.getpromotionsdetail[0].discount_type;
            if(this.getpromotionsdetail[0].discount_type=="Basic Deal"){
              this.basicFlag = true;
            }else if(this.getpromotionsdetail[0].discount_type=="Limited time Deal"){
              this.limitedFlag = true;
            }else if(this.getpromotionsdetail[0].discount_type=="Early Booker"){
              this.earlyFlag = true;
            }else if(this.getpromotionsdetail[0].discount_type=="Last Minute"){
              this.lastminFlag = true;
            }

            this.prom=this.getpromotionsdetail[0];

            if(this.getpromotionsdetail[0].discount_on=="standard_rate"){
            this.checkStandardRate=true;
            }

          }

        });
  }

checkStandardRate=false;
ServiceMessage:string;
message:string;
savePrmotions(proms){

    let parms={
      "business_id":this.session.retrieve("business_id"),
      "room_type":this.getroomslist,
      "discount_rate":proms.discount_rate,
       "room_date":this.chdate.year+'-'+this.chdate.month+'-'+this.chdate.day ,//this.datePipe.transform(new Date(), 'yyyy-MM-dd'), //whatever format you need.,
      // "room_date_st":"chdate",    
      // "room_date_ed":"enddate",
      "discount_type":this.promotionsType,
      "discount_in":proms.discount_in,
      "discount_on":this.checkStandardRate==true?"standard_rate":null
    }
    this.prmotionsService.insertPrmotionsDtls(parms)
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        this.ServiceMessage=resp.ServiceMessage;

        $('#myModal').modal('show');
        this.message="Insert Data Successfully"

        ///this.popup.options = {
      //    header: "Message",
        //  color: "rgb(51, 122, 183)", // red, blue....
       //   widthProsentage: 40, // The with of the popou measured by browser width
         // animationDuration: 1, // in seconds, 0 = no animation
        //  showButtons: true, // You can hide this in case you want to use custom buttons
         // confirmBtnContent: "OK", // The text on your confirm button
        //  cancleBtnContent: "OK", // the text on your cancel button
         // confirmBtnClass: "btn btn-default", // your class for styling the confirm button
         // cancleBtnClass: "btn btn-default", // you class for styling the cancel button
         // animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    //  };
      //  this.popup.show(this.popup.options);
      }else{
        $('#myModal').modal('show');
        this.message="failed to insert data"
      }

    });
  }
}

/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// date picker
import { NgbModule,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
//custom date format
import { NgbDateCustomParserFormatter} from "../customdateformat";
import { ToasterService } from '../toaster.service';

import { NgClass,DatePipe } from '@angular/common';
import { RoomTypeService } from "./roomtypes.service";
import { SessionStorageService } from "ngx-webstorage";
import $ from 'jquery';
import { UiSwitchModule } from 'ngx-toggle-switch';
declare var jquery:any;
declare var $ :any;

const now = new Date();

@Component({
 selector: 'app-roomtypes',
 templateUrl: './roomtypes.component.html',
 styleUrls: ['./roomtypes.component.css'],
 providers: [RoomTypeService,NgbDateCustomParserFormatter,ToasterService]
})
/* tslint:disable */
export class RoomtypesComponent implements OnInit {


 constructor(private roomTypeService: RoomTypeService,public session: SessionStorageService
 ,private datePipe: DatePipe ,private toasterService:ToasterService,
 private dateFormate:NgbDateCustomParserFormatter) { }

 public rangefrom:any = new Date().toJSON().split('T')[0];
 public from1:any = new Date().toJSON().split('T')[0];
 public fromdate:any;
 public todate3:any;

 getroomTypedetails=[];

 setper = true;
 selectrestr = [];
 public rateplan=[];
 public roomtypes=[];
 public gridval=[];
 public minimumprice=[];
 enrate:boolean=true;
 disvar:boolean=true;

 mini = false;
 max = false;
 openarrival = false;
 opendeparture = false;
 closearrival = false;
 closedeparture = false;
 houseclose = false;
 public permittedValues=[];
 public planA={};
 
 enablinputs(){
this.disvar=false
 }
 doubleclick(event:any){
 alert("iw work fine")
 console.log("dadsddsgfsvancjhfkdgkj")
 // let value = event.target.value;
 // console.log("value", value);
 console.log(event)
 if(event=='1'){
 event='0'
 console.log(event)
 alert(event)
 }

 }

 showhiderestriction(param){
 if(param == "Minimum Stay"){
 this.mini = false;
 }else{
 this.mini = true;
 }
 if(param == "Maximum Stay"){
 this.max = true;
 }
 else{
 this.max = false;
 }
 if(param == "Open For Arrival"){
 this.openarrival = true;
 }
 else{
 this.openarrival = false;
 }
 if(param == "Open For Departure"){
 this.opendeparture = true;
 }
 else{
 this.opendeparture = false;
 }
 if(param == "Close For Arrival"){
 this.closearrival = true;
 }
 else{
 this.closearrival = false;
 }
 if(param == "Close For Departure"){
 this.closedeparture = true;
 }
 else{
 this.closedeparture = false;
 }
 if(param == "House Close"){
 this.houseclose = true;
 }
 else{
 this.houseclose = false;
 }
 }

 
 onChangeObj(event,user, bs_id){
 console.log(event,user.room_id,bs_id,this.rangefrom)
 this.enrate = false
 let body = { 
 "business_id": this.bs_id,
 "room_id":user.room_id,
 "start_date": this.rangefrom,
 "end_date":this.todate2
 };
 console.log("rommmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",body)
 this.roomTypeService.selectrateplan(body)
 .subscribe((resp: any) => {
 this.rateplan = resp.Result;
 this.minimumprice=resp.minimumprice;
 // this.todate4=this.selectrestr.house_close;
 console.log("Rate plannnnnnnnnnnnnnnn",this.rateplan)
 console.log("minimumsfs",this.minimumprice)
 });
 }
public room_type:any
public room_name:any
public one="roomtype1"
public volume=[]
public arr:any=[]

public griddate=[];
public roomtype;
public gridget=[];
public newgridget:any=[];
 public bs_id;
public gridfromdate:any
public gridtodate:any
public grid_length:any
public j=0
public total_plans=[];
 ngOnInit() {
      //Grid table service
    
    this.bs_id = this.session.retrieve("business_id")
    this.roomTypeService.getgriddef()
    .subscribe((resp: any) => {
      this.griddate=resp.Date;
      this.gridget = resp.Result;
      this.fromdate=resp.from_date;
      this.todate3=resp.to_date;
    //   console.log("onload initial arrayyyyyyyyyyyy",this.gridget)
      //console.log("grid dateeeeeee",this.griddate)
      this.grid_length = this.gridget.length
    //   console.log("length",this.grid_length)
      var plans = []
// loop for dynamic data
      for(var i in this.gridget){
        
        var j=Number(i)
        j=j+1

        // console.log("i",i,this.gridget[i]['room_type'+j])
        // console.log("room_to_sell",this.gridget[i]['room_type'+j]['room_to_sell'])

// loop for room_to_sell with date match
        for (var k=0;k<this.griddate.length;k++){
         
          try{
          if(this.griddate[k] == this.gridget[i]['room_type'+j]['room_to_sell'][k]['room_date'] ){
                //pass     
                //console.log("pass")
          }
          else{
            //console.log("else")
            this.gridget[i]['room_type'+j]['room_to_sell'][k] = { business_id: "8991897773", room_date: this.griddate[k] , available_count: null}
          }
        }
        catch(e){
          this.gridget[i]['room_type'+j]['room_to_sell'][k] = { business_id: "8991897773", room_date: this.griddate[k] , available_count: null}
          
        }
       }

// pushing values in newgrid array in respective position
        this.newgridget.push(this.gridget[i]['room_type'+j])
        

// seperating available plan names in plan name array 

    //   console.log("plan",this.gridget[i]['room_type'+j]['plans'])
      var plan_names = []
      for(var a=0;a<this.gridget[i]['room_type'+j]['plans'].length;a++){
         try{
        
          if((plan_names.find(x => x == Object.keys(this.gridget[i]['room_type'+j]['plans'][a])[0])))
          {
             
           }
           else{
           plan_names.push(Object.keys(this.gridget[i]['room_type'+j]['plans'][a])[0])
           }
         }
         catch(e){
          plan_names.push(Object.keys(this.gridget[i]['room_type'+j]['plans'][a])[0])
         }
      }
    //   console.log("keysss",plan_names) 

// getting plan name in name_of_plan array if exist we won't push else push 
      var plan=[];
      var name_of_plan = [];
      
      for(var b in plan_names){
        plan = this.gridget[i]['room_type'+j]['plans'].filter(
            y => Object.keys(y)[0] === plan_names[b]);
            // console.log("test plan",plan)
            var c=Number(b)
            c=c+1
            for (var k=0;k<this.griddate.length;k++){

                try{
                    // checking whether room_open available for all room to sell dates(if room name not available set 'NA')
                    if(this.griddate[k] == plan[k]['room_plan'+c]['room_date'] ){
                           
                        //   console.log("plan[k]['room_plan'+c]['room_date']",plan[k]['room_plan'+c]['rate_plan'])
                          
                          if (plan[k]['room_plan'+c]['rate_plan'] != undefined)
                          {

                             if(name_of_plan.find(x => x == plan[k]['room_plan'+c]['rate_plan'])){
                                
                              }
                             else{
                                name_of_plan.push(plan[k]['room_plan'+c]['rate_plan'])
                          }
                        }
// replacing key name with number for room_plan1 key issue  
                        plan[k] = plan[k]['room_plan'+c]
                    }
                    else{
                      
                      plan[k] ={room_open: "NA",rate_plan:"NA"} 
                    }
                  }
                  catch(e){
                    plan[k] = {room_open: "NA",rate_plan:"NA"} 
                    
                  }
                
            }
            // console.log("test plan111",plan)
            //if (plan.length == plan)
            var filteredArray = plan.filter(function(element) { return element.rate_plan == "NA" })
            console.log("checking filtered arrayyyyyyyyyyy",filteredArray)
            if (plan.length != filteredArray.length){
                 this.total_plans.push(plan)
            }
            plan=[];
      }
   
    //   console.log("name_of_plan",name_of_plan)
    var objects = [];
    for (var d = 0; d < name_of_plan.length; d++) {

        // Create the object in the format you want
        var obj = {"name" : name_of_plan[d]};
    
        // Add it to the array
        objects.push(obj);
      }
        //  console.log("objcts",objects)
      this.gridget[i]['room_type'+j]['plan_name'] = objects
      console.log("total plannnnnnnnnnnnnn",this.total_plans,this.total_plans.length)
      this.gridget[i]['room_type'+j]['plans'] = this.total_plans

      this.total_plans = [];
      name_of_plan = [];
      }

      console.log("newgrid",this.newgridget)
    //   for(i in this.newgridget){
    //       if(this.newgridget[i].plans.length == 0){
    //         this.newgridget[i].plans.splice(i,1)
    //       }
    //   }

    this.newgridget = this.newgridget.filter(
        book => book.plans.length != 0)
      console.log("newgrid",this.newgridget)
     
  });

   
this.roomTypeService.selectroomtype()
.subscribe((resp: any) => {
  this.roomtypes = resp.Result;
  // this.todate4=this.selectrestr.house_close;
  // console.log("room plannnnnnnnnnnnnnnn",this.roomtypes)
});
   this.roomTypeService.selectrestriction()
.subscribe((resp: any) => {
  this.selectrestr = resp.Result;
  // this.todate4=this.selectrestr.house_close;
  // console.log("select restriction",this.selectrestr)
});
    this.dateFormate.format(this.fromdate);
    this.dateFormate.format(this.fromdate);
this.setper = false
    let roomParms={
      "business_id":this.session.retrieve("business_id")
    }
    //   this.roomTypeService.roomtypeDetails(roomParms)
    //     .subscribe((resp: any) => {
    //       if (resp.ServiceStatus == 'Success') {
    //        // this.getroomTypedetails=resp.Room_List;


    //         for(var i=0;i<resp.Room_List.length;i++){
    //           this.getroomTypedetails.push({
    //             "business_id":resp.Room_List[i].business_id,
    //             "facilitie1":resp.Room_List[i].facilitie1,
    //             "facilitie2":resp.Room_List[i].facilitie2,
    //             "facilitie3":resp.Room_List[i].facilitie3,
    //             "id":resp.Room_List[i].id,
    //             "room_type":resp.Room_List[i].room_type,
    //             "room_code":resp.Room_List[i].room_code,
    //             "room_name":resp.Room_List[i].room_name,
    //             "standard_rate":resp.Room_List[i].standard_rate,
    //             "standard_rate_currency":resp.Room_List[i].standard_rate_currency,
    //             "totel_room":resp.Room_List[i].totel_room,
    //             "editFlag":false,
    //             "srcfile":resp.Room_List[i].room_type==null ?"assets/images/Standard Room.jpg"  :"assets/images/"+resp.Room_List[i].room_type+".jpg"
    //           });

    //    }
    //       }

    //     });



  }



  //end of grid table service

//   on changing values in room to sell
public send_array_rmsell=[];
  editrmsell(index,value){

    console.log("index and values in room to sell",index,value)
    value.available_count=Number(value.available_count)
    if(Object.keys(value).length!=0)
    {
      this.send_array_rmsell.push(value)
    }

    console.log("final room sell array",this.send_array_rmsell)
  }

  // for color change in grid screen and change values to 0 or 1

  public send_array_savebutton:any=[];
  selectedindex;
  selecteditem
  editfun(index,model){
  this.selectedindex=index;
 
  if(model.room_open==1){
  model.room_open=0
  }
  else if(model.room_open==0){
    model.room_open=1
  
  }
  else{
     model={}
  }
  console.log("length",Object.keys(model).length)

  if(Object.keys(model).length!=0)
  {
    this.send_array_savebutton.push(model)
  }
  
  
    //   console.log("valuessssssssssondblclick",model)
    //   console.log("final model.room_open",model.room_open)
      console.log("send array savebutton",this.send_array_savebutton)
  }


// on clicking plans in grid screen
public pop_up_value=[]
public pop_grid = [];
public grid_plan_name:any
planclick(index,stuff){
    this.grid_plan_name=stuff.rate_plan
    console.log("this.plan_name",this.grid_plan_name)
    // console.log("indexxxxx st",stuff.room_id)
    // console.log("indexxxxx st",stuff.rate_plan_id)
    // console.log("final",this.newgridget)
    this.pop_grid = [];
    for(var i=0;i<this.newgridget.length;i++){
        var new_plan = this.newgridget[i].plans
        for(var j=0;j<new_plan.length;j++){
            var new_obj = new_plan[j][0]
            // console.log("new obj",new_obj,new_plan.indexOf(new_plan[j]))
            if(new_obj.room_id == stuff.room_id && new_obj.rate_plan_id == stuff.rate_plan_id){
                if(this.pop_grid.length == 0){
                this.pop_grid.push(new_plan[new_plan.indexOf(new_plan[j])])
                // for(var k in this.pop_grid){
                //     console.log("this.pop_grid[k]",this.pop_grid[k])
                //  if(this.pop_grid[k].room_open=="NA"){
                //      this.pop_grid.splice(Number(k),1);
                //  }    
                // }

                this.pop_up_value = [this.pop_grid[0].filter(
                    book => book.room_open != "NA")]
                    console.log("pop_up_value",this.pop_up_value)
                    console.log("popgrid",this.pop_grid)
                }
            }
        }
    }


}


//save button in grid main screen
  public gridsavestatus:any=[];
  sendvalues(){
    
if(this.send_array_savebutton.length!=0){

    let body_send_values={
        "records":this.send_array_savebutton 
        }
        console.log("bodyyyyyyyyy",body_send_values)
        this.roomTypeService.getsavebutton(body_send_values)
        .subscribe((resp1: any) => {
           // this.gridsavestatus = resp.Status;
        console.log("responseeeeeeee",resp1)
            
        if (resp1[0].Status == 'Success') {
            this.toasterService.success("Room Status updated successfully");
            this.refreshroomtype();
        }
        else{
            alert("error")
        }
       
        });
        this.send_array_savebutton =[];
        
}


// room to sell update to service
if(this.send_array_rmsell.length!=0){
    this.roomTypeService.getsavebutton_rm_sell(this.send_array_rmsell)
    .subscribe((resp1: any) => {
       // this.gridsavestatus = resp.Status;
    console.log("responseeeeeeee",resp1)
        
    if (resp1[0].Status == 'Success') {
        this.toasterService.success("Room Status updated successfully");
        this.refreshroomtype();
    }
    else{
        alert("error")
    }
   
    });
    this.send_array_rmsell=[];
}

    }





// grid tab set period button service



 roomName:String;
 // model define
 public sellroomorbasicrate: number;
 public roomdetailsflg = false;
 public labelforroom: any;
 standardRoom(flag) {
 this.roomdetailsflg = true; 
 this.labelforroom = flag.room_type;
 this.roomName=flag.room_name;
 }
 todate:any;
 retrictto:any;

 
setperiod=[];
 public dataa = [];
 public countdates = [];
 public monthh = [];
 public monthhh = [];
 public dayscountt = [];
 public countdys: number;
 public cnt: number;
 public showlabelname = false;
 getdatedetails=[];
 parms:{};
 todate2:any;
 todate1:any;
 todate4:any;
 planA7:any = {};

//  set period button calls after giving dates in grid screen 
 getperioddays(fromdate1,todate1) {

 this.gridget=[];   
this.griddate=[];
this.newgridget=[];
this.total_plans=[];

this.parms = {
 
 "business_id": this.session.retrieve("business_id"),
 "from_date": fromdate1,
 "to_date": todate1


 }
 
 console.log("getdatedaetails#####################",this.parms)
 this.roomTypeService.getgrid(this.parms)
 .subscribe((resp: any) => {
 if (resp.ServiceStatus == 'Success') {
    this.griddate=resp.Date;
    this.gridget = resp.Result;
    this.gridfromdate=resp.from_date;
    this.gridtodate=resp.to_date;
  //   console.log("onload initial arrayyyyyyyyyyyy",this.gridget)
    //console.log("grid dateeeeeee",this.griddate)
    this.grid_length = this.gridget.length
    //   console.log("length",this.grid_length)
      var plans = []
// loop for dynamic data
      for(var i in this.gridget){
        
        var j=Number(i)
        j=j+1

        // console.log("i",i,this.gridget[i]['room_type'+j])
        // console.log("room_to_sell",this.gridget[i]['room_type'+j]['room_to_sell'])

// loop for room_to_sell with date match
        for (var k=0;k<this.griddate.length;k++){
         
          try{
          if(this.griddate[k] == this.gridget[i]['room_type'+j]['room_to_sell'][k]['room_date'] ){
                //pass     
                //console.log("pass")
          }
          else{
            //console.log("else")
            this.gridget[i]['room_type'+j]['room_to_sell'][k] = { business_id: "8991897773", room_date: this.griddate[k] , available_count: null}
          }
        }
        catch(e){
          this.gridget[i]['room_type'+j]['room_to_sell'][k] = { business_id: "8991897773", room_date: this.griddate[k] , available_count: null}
          
        }
       }

// pushing values in newgrid array in respective position
        this.newgridget.push(this.gridget[i]['room_type'+j])
        

// seperating available plan names in plan name array 

    //   console.log("plan",this.gridget[i]['room_type'+j]['plans'])
      var plan_names = []
      for(var a=0;a<this.gridget[i]['room_type'+j]['plans'].length;a++){
         try{
        
          if((plan_names.find(x => x == Object.keys(this.gridget[i]['room_type'+j]['plans'][a])[0])))
          {
             
           }
           else{
           plan_names.push(Object.keys(this.gridget[i]['room_type'+j]['plans'][a])[0])
           }
         }
         catch(e){
          plan_names.push(Object.keys(this.gridget[i]['room_type'+j]['plans'][a])[0])
         }
      }
    //   console.log("keysss",plan_names) 

// getting plan name in name_of_plan array if exist we won't push else push 
      var plan=[];
      var name_of_plan = [];
      
      for(var b in plan_names){
        plan = this.gridget[i]['room_type'+j]['plans'].filter(
            y => Object.keys(y)[0] === plan_names[b]);
            // console.log("test plan",plan)
            var c=Number(b)
            c=c+1
            for (var k=0;k<this.griddate.length;k++){

                try{
                    // checking whether room_open available for all room to sell dates(if room name not available set 'NA')
                    if(this.griddate[k] == plan[k]['room_plan'+c]['room_date'] ){
                           
                        //   console.log("plan[k]['room_plan'+c]['room_date']",plan[k]['room_plan'+c]['rate_plan'])
                          
                          if (plan[k]['room_plan'+c]['rate_plan'] != undefined)
                          {

                             if(name_of_plan.find(x => x == plan[k]['room_plan'+c]['rate_plan'])){
                                
                              }
                             else{
                                name_of_plan.push(plan[k]['room_plan'+c]['rate_plan'])
                          }
                        }
// replacing key name with number for room_plan1 key issue  
                        plan[k] = plan[k]['room_plan'+c]
                    }
                    else{
                      
                      plan[k] ={room_open: "NA",rate_plan:"NA"} 
                    }
                  }
                  catch(e){
                    plan[k] = {room_open: "NA",rate_plan:"NA"} 
                    
                  }
                
            }
            // console.log("test plan111",plan)
            //if (plan.length == plan)
            var filteredArray = plan.filter(function(element) { return element.rate_plan == "NA" })
            console.log("checking filtered arrayyyyyyyyyyy",filteredArray)
            if (plan.length != filteredArray.length){
                 this.total_plans.push(plan)
            }
            plan=[];
      }
   
    //   console.log("name_of_plan",name_of_plan)
    var objects = [];
    for (var d = 0; d < name_of_plan.length; d++) {

        // Create the object in the format you want
        var obj = {"name" : name_of_plan[d]};
    
        // Add it to the array
        objects.push(obj);
      }
        //  console.log("objcts",objects)
      this.gridget[i]['room_type'+j]['plan_name'] = objects
        console.log("total plannnnnnnnnnnnnn",this.total_plans)
      this.gridget[i]['room_type'+j]['plans'] = this.total_plans

      this.total_plans = [];
      name_of_plan = [];
      }

      console.log("newgrid",this.newgridget)

      this.newgridget = this.newgridget.filter(
        book => book.plans.length != 0)
      console.log("newgrid",this.newgridget)
 }

});
 
 }

//  after clicking save button in grid popups
 
sendvalpopgrid(){
    console.log("roomdate-111",this.pop_up_value);
    let body_send_values={
        "records":this.pop_up_value[0] 
        }
        console.log("bodyyyyyyyyy",body_send_values)
        this.roomTypeService.getsavebutton(body_send_values)
        .subscribe((resp1: any) => {
           // this.gridsavestatus = resp.Status;
        // console.log("responseeeeeeee",resp1)
            
        if (resp1[0].Status == 'Success') {
            this.toasterService.success("Rate Plane Updated Successfully");
        
        }
        else{
            alert("error")
        }
       
        });


}

 

 // previous and next button functions
 public prevflag = false;
 public nextflag = true;
 clountnextprev = 0;
 start: number = 0;
 end: number = 14;
 nextColumns() {
 this.clountnextprev++;
 if (this.countdates.length >= this.end) {
 this.start = this.start + 14;
 this.end = this.end + 14;
 if (this.start == 0) {
 this.prevflag = false;
 } else if (this.start > 0) {
 this.prevflag = true;
 }
 } if (this.countdates.length == this.end || this.countdates.length < this.end) {
 this.prevflag = true;
 this.nextflag = false;
 }

 }
 preveviousColumns() {
 this.clountnextprev--;
 if (this.start > 0) {
 this.start = this.start - 14;
 this.end = this.end - 14;
 } if (this.start == 0) {
 this.prevflag = false;
 this.nextflag = true;
 }
 if (this.countdates.length > this.end) {
 this.nextflag = true;
 }
 }


 // call modal popup room to sell start
 public labelundrinfo: any;
 public sellmodalsavebut = false;
 callmodalroomsell() {
 this.labelundrinfo = 'Number of room to sell';
 this.sellmodalsavebut = true;
 this.editsavebut = false;
 this.sellroomorbasicrate = null;
 }

 savesellroom() {
 for (var j = 0; j < this.countdates.length; j++) {
 this.countdates[j].Available_Room_Count = this.sellroomorbasicrate;
 }

 }

 // change sell room based on index
 indexval: number;
 editsellroom(event, index, model) {
 this.indexval = 0;
 if (this.start == (14 * this.clountnextprev)) {
 this.indexval = index + (14 * this.clountnextprev);
 this.countdates[this.indexval].Available_Room_Count = model;
 } else {
 this.countdates[index].Available_Room_Count = model;
 }
 }
 // end sell to room functions


 // standard rate
 public hideedit = false;
 standardrate() {
 this.hideedit = true;
 }
 
 // click edit basci button startcallmodalroomsell
 public editsavebut = false;
 clickeditbasicpricebut() {
 this.labelundrinfo = 'New price per night';
 this.sellmodalsavebut = false;
 this.editsavebut = true;
 }

 // edit basic price based on index
 toggleon = true;
 indexvalprice: number;
 editbasciprice(event, index, model) {
 this.indexvalprice = 0;
 
 if (this.start == (14 * this.clountnextprev)) {
 this.indexvalprice = index + (14 * this.clountnextprev);
 this.countdates[this.indexvalprice].Price = model;
 this.countdates[this.indexvalprice].Room_Status = 'Declared';
 // this.toggleon=true;
 } else {
 this.countdates[index].Price = model;
 this.countdates[index].Room_Status = 'Declared';
 // this.toggleon=false;
 }
 }
 tooglebutton(index){
 if (this.countdates[index].Room_Status == 'Declared')
 {
 
 }
 }

 saveeditbasicprice() {
 for (var j = 0; j < this.countdates.length; j++) {
 this.countdates[j].Price = this.sellroomorbasicrate;
 this.countdates[j].Room_Status = 'Declared';
 }
 }

 // end edit basic price this.sellroomorbasicrate=null;

 // click back button
 cleartemp() {
 this.sellroomorbasicrate = null;
 this.countdates = [];
 this.showlabelname = false;
 this.fromdate=null;
 this.todate=null;
 }


 


 selectedindexx;
 selecteditemm
 sendval(departure:any){
 console.log("DATEEE-----------------",departure);
 for(var i=0;i<departure.length;i++){
 if(departure[i].close_arrival == null){
 departure[i].close_arrival = "0"; 
 console.log("arrivallllll",departure[i].close_arrival)
 }
 console.log("DATEEE2222222222---",departure[i].close_arrival);
 
 
 }
 let body_send_values={
 "records":departure 
 }
 console.log("bodyyyyyyyyy",body_send_values)
 this.roomTypeService.getsavebutton(body_send_values)
 .subscribe((resp: any) => {
 if (resp[0].Status == 'Success') {
 alert("resp.Status "+resp[0].Status);
 }

 });


 }
 // sendval(rate,room_open,min,max,arrival,dept){
 // console.log("helloooooooooooooooooooooooooooooo",rate,room_open,min,max,arrival,dept)
 
 // }
 //save room count and rates

 saveRoomNoandRate(datee){
 console.log("data111111111111111",datee)
 console.log("openvalue*****************",this.open)
 console.log("arrayvalue",this.countdates)
 let parmsroom={
 "business_id":this.session.retrieve("business_id"),
 "room_type":this.labelforroom,
 "rooms":this.countdates
 }

 this.roomTypeService.insertandUpdateRatesellcount(parmsroom)
 .subscribe((resp: any) => {
 if (resp.ServiceStatus == 'Success') {
 alert("resp.ServiceStatus "+resp.ServiceStatus);
 }

 });
 }
 // date range
 public sunday:number;
 public monday:number;
 public tuesday:number;
 public wednesday:number;
 public thursday:number;
 public friday:number;
 public saturday:number;
 public from:any;
 public to:any;
 public price:number;
 public sell:number;
 public extra_price:number;
 public user={};
 roomTypesFieldErrorFlag = false;
 daterangedetails(user) {
    console.log("daterange details", user,this.rangefrom)
    console.log("userrrrr",user.roomtosell)
    this.from = this.rangefrom
    this.to = this.todate2
    // if (getdate != null && todate != null && user.roomtosell != null && user.rangeprice != null && user.extra_adult_rate != null) {
    if (this.from !=null && this.to !=null && user.room_id !=null && user.rate_plan_id !=null && user.roomtosell != null && user.rangeprice != null && user.extra_adult_rate != null && (user.sund != null || user.mon != null || user.tue != null || user.wed != null || user.thur != null || user.fri != null || user.sat != null)) {
        // alert("all values are given");
        this.roomTypesFieldErrorFlag = false;
        // days checkbox input
        this.extra_price = user.extra_adult_rate
        this.price = user.rangeprice;
        this.sell = user.roomtosell;
        if (user.sund == true) {
            this.sunday = 1;
            // console.log("checkif", this.sunday)
        } else {
            this.sunday = 0;
            // console.log("checkelse", this.sunday)
        }
        if (user.mon == true) {
            this.monday = 1;
        }
        else {
            this.monday = 0;
        }
        if (user.tue == true) {
            this.tuesday = 1;
        }
        else {
            this.tuesday = 0;
        }
        if (user.wed == true) {
            this.wednesday = 1;
        }
        else {
            this.wednesday = 0;
        }
        if (user.thur == true) {
            this.thursday = 1;
        }
        else {
            this.thursday = 0;
        }
        if (user.fri == true) {
            this.friday = 1;
        }
        else {
            this.friday = 0;
        }
        if (user.sat == true) {
            this.saturday = 1;
        }
        else {
            this.saturday = 0;
        }


        // console.log("details", this.sunday,this.monday,this.rangefrom.year+'-'+this.rangefrom.month+'-'+this.rangefrom.day,this.todate.year+'-'+this.todate.month+'-'+this.todate.day,)
        console.log("dayscount", this.monday, this.tuesday, this.sunday, this.thursday)

        let params = {

            "business_id": this.session.retrieve("business_id").toString(),
            "st_date": this.from.toString(),
            "ed_date": this.to.toString(),
            "days": {
                "sun": this.sunday,
                "mon": this.monday,
                "tue": this.tuesday,
                "wed": this.wednesday,
                "thu": this.thursday,
                "fri": this.friday,
                "sat": this.saturday
            },
            "available_count": this.sell,
            "room_rate": this.price,
            "extra_adult_rate": this.extra_price,
            "room_id": user.room_id,
            "rate_plan_id": user.rate_plan_id

        }
        console.log("input********************", params)
        this.roomTypeService.daterangecount(params)

            .subscribe((resp: any) => {
                if (resp.ServiceStatus == 'Success') {
                    this.toasterService.success("Date Range Rate Plan Updated Successfully");
                    this.user={};
                    this.rangefrom;
                    this.todate2 ={};
                }
            });
    }
    else{
        // alert("All values are mandatory");
        this.roomTypesFieldErrorFlag = true
    }
}
public rate_res = {};
 restrcitdeatils(rate_res) {
    console.log("restrictdetails",rate_res)
    if(rate_res.dropdownvalue !=null){
        this.roomTypesFieldErrorFlag = false
        if(rate_res.dropdownvalue == "Minimum Stay"){
            if(rate_res.min_stay !=null && rate_res.min_date){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Maximum Stay"){
            if(rate_res.max_stay !=null && rate_res.max_date){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Open For Arrival"){
            if(rate_res.open_arrival_from !=null && rate_res.open_arrival_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Open For Departure"){
            if(rate_res.open_departure_from !=null && rate_res.open_departure_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Close For Arrival"){
            if(rate_res.close_arrival_from !=null && rate_res.close_arrival_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Close For Departure"){
            if(rate_res.close_departure_from !=null && rate_res.close_departure_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "House Close"){
            if(rate_res.house_close !=null ){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
    }else{
        this.roomTypesFieldErrorFlag = true
    }
    
}

restrictionData(rate_res){
    let body = {


        // "business_id":this.session.retrieve("business_id").toString(),
        "business_id": this.session.retrieve("business_id"),
        "min_stay": rate_res.min_stay != null ? rate_res.min_stay.toString() : "",
        "max_stay": rate_res.max_stay != null ? rate_res.max_stay.toString() : "",
        "close_arrival": rate_res.close_arrival_from != null ? rate_res.close_arrival_from : "",
        "close_departure": rate_res.close_departure_from != null ? rate_res.close_departure_from : "",
        "house_close": rate_res.house_close != null ? rate_res.house_close : "",
        "min_stay_date": rate_res.min_date != null ? rate_res.min_date : "",
        "max_stay_date": rate_res.max_date != null ? rate_res.max_date : "",
        "close_arrival_to": rate_res.close_arrival_to != null ? rate_res.close_arrival_to : "",
        "close_departure_to": rate_res.close_departure_to != null ? rate_res.close_departure_to : "",
        "open_arrival": rate_res.open_arrival_from != null ? rate_res.open_arrival_from : "",
        "open_departure": rate_res.open_departure_from != null ? rate_res.open_departure_from : "",
        "open_arrival_to": rate_res.open_arrival_to != null ? rate_res.open_arrival_to : "",
        "open_departure_to": rate_res.open_departure_to != null ? rate_res.open_departure_to : ""


    }

    console.log("params details", body)
    this.roomTypeService.restriction(body)

        .subscribe((resp: any) => {
            if (resp.ServiceStatus == 'Success') {
                this.toasterService.success("Restriction updated Successfully");
            }

        });
}
 public toggleValue:any;
public open:any;
public toggdate;
tog:boolean = false;

public togdate;

 
 
 toggleClicked(lt){
 // this.toggle_on = toggleValue
 console.log("all value is",lt)
 console.log("toggelevalue",lt.room_open)
 this.toggleValue = true
 this.togdate = lt.date;
 console.log("get date",this.togdate)
 // console.log('the toggle has been clicked! ' + this.toggleValue);
 if (lt.room_open == true ){
 this.open = 1
 this.tog = false
 // this.toggdate = this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
 console.log("set toggle value",lt.room_open ,this.tog )
 }
 else{
 this.open = 0
 this.tog=true
 console.log("else set toggle value",lt.room_open ,this.tog )
 }
 return this.open
 }
 preventSingleClick = false;
 timer: any;
 
 doubleClick () {
 this.preventSingleClick = true;
 clearTimeout(this.timer);
 alert('Double Click Event')

 }
 refreshroomtype(){
    this.roomTypeService.selectroomtype()
    .subscribe((resp: any) => {
        this.roomtypes = resp.Result;
        // this.todate4=this.selectrestr.house_close;
        console.log("room plannnnnnnnnnnnnnnn", this.roomtypes)
    });
}
}

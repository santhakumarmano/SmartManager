/* tslint:disable */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { ConfigurationService } from "./configuration.service";
import { ToasterService } from '../toaster.service';

import $ from 'jquery';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { viewClassName } from '@angular/compiler';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [ConfigurationService,ToasterService]
})
export class ConfigurationComponent implements OnInit {
  
  roomsize = [];
  bedding = [];
  beddingsize = [];
  roomamenities = [];
  extrabed = [];
  inclusion = [];
  public plan:any = {};
  i = 0;

  public date:any = new Date().toJSON().split('T')[0];
  constructor(private configurationService: ConfigurationService,
    public session: SessionStorageService,private toasterService:ToasterService) {}
    
  showMore = false;
  add = {};
  roomdetails: any;
  roomdetails1: any = [];
  amentiesarr = [];
  amenitiestemp: any = [];
  amentiesss = [];
  roomamentites = []
  public roomtypes = [];
  public cancelpolicy = [];
  public rateplan=[];
  public pakages=[];
  public roomdetils_length:any;
  public room_amentie = [];
  public room_amentie_name:any;
  public amentite_details = [];
          //show more
          showlessBut(){
            this.showMore=false;
          }
    

  //show record 
    room;
    rmsize;
    maxadult;
    maxchild;
    beding;
    bedsize;
    extrabeds;
    amenitie;
    photo;
    smoke;
    minprice;
    rmid;
  viewdata(flags){
    this.Queryselectoptions();
    this.showMore=true;
this.room=flags.room_name;
this.rmid=flags.room_id;
this.rmsize=flags.room_size_id;
this.maxadult=flags.max_adults;
this.maxchild=flags.max_child
this.beding=flags.bedding_option_id;
this.bedsize=flags.bed_size_id;
this.extrabeds=flags.extrabed_id;
this.amenitie=flags.amenitie_id;
this.photo=flags.upload_photos;
this.smoke=flags.smoking;
this.minprice= flags.min_price;
  }
  public view_rateplan_details = [];
  ngOnInit() {
    this.configurationService.view_rateplan()
    .subscribe((resp:any)=>{
       this.view_rateplan_details=resp.Result;
       console.log(this.view_rateplan_details)
    });
    this.configurationService.packages()
    .subscribe((resp:any)=>{
       this.pakages=resp.Result;
       console.log(this.pakages)
    });
    this.configurationService.selectrateplan()
    .subscribe((resp:any)=>{
       this.rateplan=resp.Result;
       console.log(this.rateplan)
    });
    this.configurationService.selectroomtype()
.subscribe((resp:any)=>{
   this.roomtypes=resp.Result;
   console.log(this.roomtypes)
});
this.configurationService.cancellationpolicy()
.subscribe((resp:any)=>{
   this.cancelpolicy=resp.Result;
   console.log(this.cancelpolicy)
});
    this.configurationService.getRoomDetails()
.subscribe((resp:any)=>{
   this.roomdetails=resp.Result;
   console.log(this.roomdetails)
   this.roomdetils_length = this.roomdetails.length
   console.log(this.roomdetils_length)
   for (var i = 0; i < this.roomdetails.length; i++)
   {
    this.amentiesss = this.roomdetails[i]['amenitie']
    this.amentiesss = this.amentiesss.slice(0,3)
    this.room_amentie_name = this.roomdetails[i]['room_name']
    //  console.log(this.roomdetails)
    //  this.amentiesss = this.amenitiestemp.amenitie.slice(0,3);
    //  this.amentiesss = this.amentiesss.slice(0,3);
    //  console.log(this.amentiesss)
    //  console.log(this.room_amentie_name)
    this.roomdetails[i]["amentie_name1"] = this.amentiesss[0],
    this.roomdetails[i]["amentie_name2"] = this.amentiesss[1],
    this.roomdetails[i]["amentie_name3"] = this.amentiesss[2],
     this.amentite_details.push({
       "room_name":this.room_amentie_name,
       "amentie_name1":this.amentiesss[0],
       "amentie_name2":this.amentiesss[1],
       "amentie_name3":this.amentiesss[2]
     })
    
   }
  //  console.log("thisamen*************",this.amentite_details)
   console.log("thisamen*************",this.roomdetails)
  //  console.log("'djahdhasdia",this.amentite_details)
    //  this.roomdetails.push({
    //    "amenitie":this.amentiesss
    //  })
    //  console.log("this.amen",this.roomdetails)
//    for (let amenitiestemp of this.roomdetails ){
//     // this.amenitiestemp = amenitiestemp[amenitiestemp.length-1]
//      this.amentiesss = amenitiestemp.amenitie.split(",");
//      this.amentiesss = this.amentiesss.slice(0,3);

//      console.log("this is amenties**************",this.amentiesss)
//      this.i=this.i+1;
//    }
 
//    console.log("new value", this.roomdetails)

// console.log("get room details response",JSON.stringify(this.roomdetails));
});
}
/**------------Image Upload --------- */

imageUrl: string = "assets/images/uploadimage.jpg";
fileToUpload: File = null;
handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

  //Show image preview
  var reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
}
public urlgenerated:any;
public upload_photos:any;
onSubmit(){
  let formData = new FormData();
  formData.append("Image",this.fileToUpload,this.fileToUpload.name)
  formData.append("name","AKIAJHYIVCBG2UVXBPUQ|F+7a1YjBtaAiFoqz2h6BZ6EHupV9jQvTEuC90xeG")
  this.configurationService.postFile(formData).subscribe(
    (data:any) =>{
      console.log("done",typeof(data));
      this.plan.upload_photos=data.url;
      this.photo=data.url;
    }
  )
}

// end the image

//update
configupdate;
updateconfig(room,rmsize,maxadult,maxchild,beding,bedsize,extrabeds,amenitie,photo,minprice,smoke,rmid){
  this.configurationService.updateservice(room,rmsize,maxadult,maxchild,beding,bedsize,extrabeds,amenitie,photo,minprice,smoke,rmid)
  .subscribe((resp: any) => {
    if(resp.ReturnCode == "RUS"){
      // this.toastSuccess("Room type Updated Successfully");
      this.toasterService.success("Room Type Updated Successfully");
  this.configupdate=resp.ReturnCode;
  this.configurationService.getRoomDetails()
  .subscribe((resp:any)=>{
     this.roomdetails=resp.Result;
     console.log(this.roomdetails)
     this.roomdetils_length = this.roomdetails.length
     console.log(this.roomdetils_length)
     for (var i = 0; i < this.roomdetails.length; i++)
     {
      this.amentiesss = this.roomdetails[i]['amenitie']
      this.amentiesss = this.amentiesss.slice(0,3)
      this.room_amentie_name = this.roomdetails[i]['room_name']
      this.roomdetails[i]["amentie_name1"] = this.amentiesss[0],
      this.roomdetails[i]["amentie_name2"] = this.amentiesss[1],
      this.roomdetails[i]["amentie_name3"] = this.amentiesss[2],
       this.amentite_details.push({
         "room_name":this.room_amentie_name,
         "amentie_name1":this.amentiesss[0],
         "amentie_name2":this.amentiesss[1],
         "amentie_name3":this.amentiesss[2]
       })
     }
  });
  this.showlessBut();
    }
  })
}
// public roomTypesFieldErrorFlag:boolean;
roomTypesFieldErrorFlag = false;
  insertroom(param) {
    param.business_id = this.session.retrieve("business_id");
    console.log("$$$$$$$$$$$$$", JSON.stringify(param));
    if (param.smoking == true) {
      param.smoking = 1;
    } else {
      param.smoking = 0;
    }
    if(param.room_name !=null && param.max_adults !=null && param.max_child && param.room_size_id !=null && param.bedding_option_id !=null && param.extrabed_id !=null && param.bed_size_id !=null && param.amenitie_id !=null && param.smoking !=null && param.min_price !=null){
      this.roomTypesFieldErrorFlag = false;
  
    console.log("Checking smoking value", param.smoking);
    this.configurationService.insertRoomDetails(param)
      .subscribe((resp: any) => {
        if (resp.ReturnCode == 'RIS') {
          this.toasterService.success("Room Type is Created");
         
          this.configurationService.getRoomDetails()
          .subscribe((resp:any)=>{
             this.roomdetails=resp.Result;
             console.log(this.roomdetails)
             this.roomdetils_length = this.roomdetails.length
             console.log(this.roomdetils_length)
             for (var i = 0; i < this.roomdetails.length; i++)
             {
              this.amentiesss = this.roomdetails[i]['amenitie']
              this.amentiesss = this.amentiesss.slice(0,3)
              this.room_amentie_name = this.roomdetails[i]['room_name']
              //  console.log(this.roomdetails)
              //  this.amentiesss = this.amenitiestemp.amenitie.slice(0,3);
              //  this.amentiesss = this.amentiesss.slice(0,3);
              //  console.log(this.amentiesss)
              //  console.log(this.room_amentie_name)
              this.roomdetails[i]["amentie_name1"] = this.amentiesss[0],
              this.roomdetails[i]["amentie_name2"] = this.amentiesss[1],
              this.roomdetails[i]["amentie_name3"] = this.amentiesss[2],
               this.amentite_details.push({
                 "room_name":this.room_amentie_name,
                 "amentie_name1":this.amentiesss[0],
                 "amentie_name2":this.amentiesss[1],
                 "amentie_name3":this.amentiesss[2]
               })
              
             }
            //  console.log("thisamen*************",this.amentite_details)
             console.log("thisamen*************",this.roomdetails)
            //  console.log("'djahdhasdia",this.amentite_details)
              //  this.roomdetails.push({
              //    "amenitie":this.amentiesss
              //  })
              //  console.log("this.amen",this.roomdetails)
          //    for (let amenitiestemp of this.roomdetails ){
          //     // this.amenitiestemp = amenitiestemp[amenitiestemp.length-1]
          //      this.amentiesss = amenitiestemp.amenitie.split(",");
          //      this.amentiesss = this.amentiesss.slice(0,3);
          
          //      console.log("this is amenties**************",this.amentiesss)
          //      this.i=this.i+1;
          //    }
           
          //    console.log("new value", this.roomdetails)
          
          // console.log("get room details response",JSON.stringify(this.roomdetails));
          });
        }
        this.plan = {};
        // console.log("RETURN VALUE FOR INSERT ROOM", resp.Return);
      });
    }
    else{
      this.roomTypesFieldErrorFlag = true;
    }
  }

Queryselectoptions(){
  this.configurationService.getRoom()
  .subscribe((resp:any)=>{
  this.roomsize=resp.Result;
  console.log("1) Roomsizeeeeee",this.roomsize);
  });
  this.configurationService.getBedding()
  .subscribe((resp:any)=>{
  this.bedding=resp.Result;
  console.log("2) Beddinggggg",this.bedding);
  });
  this.configurationService.getBeddingSize()
  .subscribe((resp:any)=>{
  this.beddingsize=resp.Result;
  console.log("3) Bedding Sizeeee",this.beddingsize);
  });
  this.configurationService.getExtraBed()
  .subscribe((resp:any)=>{
  this.extrabed=resp.Result;
  console.log("3) Extra Beddd",this.extrabed);
  });
  this.configurationService.getRoomAmenities()
  .subscribe((resp:any)=>{
  this.roomamenities=resp.Result;
  console.log("4) Room Amenities",this.roomamenities);
  });
  this.configurationService.getInclusion()
  .subscribe((resp:any)=>{
  this.inclusion=resp.Result;
  console.log("5) Inclusion",this.inclusion);
  });
}
public checkedList = [];
public roomcheckedList = [];
onCheckboxChange(option, event) {
  if(event.target.checked) {
    this.checkedList.push(option.packages_id);
    console.log("checkedlist",this.checkedList)
  } else {
    for(var i=0 ; i < this.pakages.length; i++) {
      if(this.checkedList[i] == option.packages_id){
        this.checkedList.splice(i,1);
      }
    }
  }
  console.log(this.checkedList);
  }
  onroomCheckboxChange(option, event) {
    if(event.target.checked) {
      this.roomcheckedList.push(option.room_id);
      console.log("onroomCheckboxChange",this.roomcheckedList)
    } else {
      for(var i=0 ; i < this.roomtypes.length; i++) {
        if(this.roomcheckedList[i] == option.room_id){
          this.roomcheckedList.splice(i,1);
        }
      }
    }
    console.log(this.roomcheckedList);
    }
  public conf_rate  = {};
insertrateplan(conf_rate){
console.log("rateplan screen",conf_rate)
if(conf_rate.rate_plan_id !=null && conf_rate.policy_id !=null && conf_rate.fromdate !=null && conf_rate.todate !=null && this.checkedList.length !=0  && this.roomcheckedList.length !=0 ){
  this.roomTypesFieldErrorFlag = false;

let body = {   
	"business_id":  this.session.retrieve("business_id").toString(),
	"rate_plan":conf_rate.rate_plan_id,
	"cancellation_policy_id":conf_rate.policy_id,
	"room_types_id":this.roomcheckedList,
	"packages_id":this.checkedList,
	"start_date":conf_rate.fromdate,
	"end_date":conf_rate.todate
}
console.log("body value",body)

this.configurationService.create_rate_planss(body)

.subscribe((resp: any) => {
  this.checkedList = [];
    this.roomcheckedList = [];

  if (resp.ServiceStatus == 'Success') {
    
    this.conf_rate = {};
    this.toasterService.success("Rate Plan is Created");
  }
  


  
});
}
else{
  this.roomTypesFieldErrorFlag = true
}
}
// Auto Refersh data
refreshroom(){
  this.configurationService.selectroomtype()
  .subscribe((resp:any)=>{
     this.roomtypes=resp.Result;
     console.log(this.roomtypes)
  });
}
clickrateplan(){
  this.configurationService.packages()
  .subscribe((resp:any)=>{
     this.pakages=resp.Result;
     console.log(this.pakages)
  });
}

}


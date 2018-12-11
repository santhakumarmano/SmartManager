import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReservationService } from './reservation.service';
import { NgbDateCustomParserFormatter } from "../customdateformat";
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const now = new Date();

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService, NgbDateCustomParserFormatter]
})

export class ReservationComponent implements OnInit {
  public hello:any = [];
  public tabledata: any = [];
  showMore = false;
  constructor(private ReservationService: ReservationService,
    private dateFormate: NgbDateCustomParserFormatter,
    private router: Router,
    private route: ActivatedRoute) { }

  //end date
  public date: any = new Date().toJSON().split('T')[0];

  // public dep_date:any=new Date().toJSON().split('T')[0];
  //show more
  showMoreBut() {
    this.showMore = true;
  }
  //show more
  showlessBut() {
    this.showMore = false;
  }
  filterDatefrmList(date, dept_date) {

    if (date != null && dept_date != null) {
      let selectedMembers = this.hello.filter(
        m => new Date(m.customer_arrival_date) >= new Date(date) && new Date(m.customer_depature_date) <= new Date(dept_date)
      );
      console.log(selectedMembers);
      this.hello = selectedMembers;
      this.sorttable()
    }
    else if (date != null && (dept_date == null || dept_date === undefined || dept_date == "")) {
      let selectedMembers = this.hello.filter(
        k => new Date(k.customer_arrival_date) >= new Date(this.date)
      );
      this.hello = selectedMembers;
    }
    else if (date === undefined && dept_date === undefined) {
      console.log(this.hello);
      this.hello = this.hello;
    }
    else {
      this.hello = this.hello;
    }

  }

  NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate(), };
  arriv: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  depart: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  ngOnInit() {

    this.cleartab();

  }
  sorttable() {
    let args = "-customer_arrival_date"
    let direction = args[0][0];
    let column = args.replace('-', '');
    this.hello.sort((a: any, b: any) => {
      let left = Number(new Date(a[column]));
      let right = Number(new Date(b[column]));
      return (direction === "-") ? left - right : right - left;
    });
    return this.hello;
  }
  cleartab() {
    this.hello="";

    this.ReservationService.reservationdetails()
      .subscribe((resp: any) => {
        this.hello = resp.result;
        let selectedMembers = this.hello.filter(
          k => new Date(k.customer_arrival_date) >= new Date(this.date)
        );
        this.hello = selectedMembers;
        this.sorttable()
        console.log("hello", this.hello)
      });


  }
  Roomtype;
  Confirmation;
  Arrival;
  Bookingcon;
  Booked;
  Mobile;
  Departure;
  creditcard;
  Expdate;
  Roomno;
  channel;
  adults;
  country;
  Language;
  child;
  rate;
  Status;
  pickup;
  modification;
  sms;
  name;
  hotel;
  selectindex;
  selectMembersEdit(details, index) {
    console.log(details)
    this.selectindex = index;
    this.Roomtype = details.customer_room_type;
    this.Confirmation = details.customer_confirmation_number;
    this.Arrival = details.customer_arrival_date;
    this.Bookingcon = details.customer_booking_confirmed;
    this.Booked = details.booked_date;
    this.Mobile = details.customer_mobile;
    this.Departure = details.customer_depature_date;
    this.creditcard = details.customer_cc;
    this.Expdate = details.customer_expirydate;
    this.Roomno = details.customer_no_of_rooms;
    this.channel = details.channel;
    this.adults = details.customer_adult;
    this.country = details.cntry_code;
    this.Language = details.ivr_language;
    this.child = details.customer_child;
    this.rate = details.customer_amount;
    this.Status = details.customer_booked_status;
    this.pickup = details.customer_pickup_drop;
    this.modification = details.modification;
    this.sms = details.send_sms;
    this.name = details.customer_name;
    console.log(this.Roomtype);
    this.hotel = details.hotel_name;

    //cofirmation table
    this.ReservationService.getreservationtable(this.Confirmation)
      .subscribe((resp: any) => {
        this.tabledata = resp.result;
        console.log("hello", this.tabledata)
      });
  }



}

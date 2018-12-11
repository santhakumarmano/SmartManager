/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import $ from 'jquery';
import { SessionStorageService } from 'ngx-webstorage';
import { CancellationpaymentService } from './cancellationpayment.service';


@Component({
  selector: 'app-cancellationpayment',
  templateUrl: './cancellationpayment.component.html',
  styleUrls: ['./cancellationpayment.component.css'],
  providers: [CancellationpaymentService]
})

export class CancellationpaymentComponent implements OnInit {

  constructor(public session: SessionStorageService, private cancellationpaymentService: CancellationpaymentService) { }

  cancelDtls :any={};
  
  ngOnInit() {
    this.cancelDtls.freecancel="yes";    
    this.cancelDtls.freePaymntchargeDesc="After the reservation is made";
    this.cancelDtls.freePayment="yes";
  }



  cancelationdetails() {
    $('#myModal').modal('show');
  }
  //send cancellation details
  saveCancellationDetails(details) {
    let params={
      "business_id":this.session.retrieve("business_id"),
      "free_cancel":details.freecancel,
      "free_of_charge":details.freechargeDay,
      "charge_30day_before":details.freechargeCost,
      "charge_no_show":details.freecargeNoShow,
      "prepament":details.freePayment,
      "charge_payent":details.freePaymntchargeDesc
    }
    
    this.cancellationpaymentService.cancellationDetails(params)
      .subscribe((resp: any) => {
        if (resp.ServiceStatus == 'Success') {

        }
      });
  }
}

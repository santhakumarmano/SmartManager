import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SessionStorageService } from "ngx-webstorage";
@Injectable()
export class ReportsService {

  constructor(
    private http: Http,public session: SessionStorageService
  ) { }

  
  //statistics details
  statisticsDetails(start_date,end_date): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    let body = { 
      
        "arrival_from":start_date,
        "arrival_to":end_date,
        "business_id":this.session.retrieve("business_id") 
          };

    return this.http.post('https://ivrinfocuit.herokuapp.com/Getreservationcancelmodification', body , options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }  
  channeldetails(start_date,end_date): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  
  let body = { 
    "arrival_from":start_date,
  "arrival_to":end_date,
  "business_id":this.session.retrieve("business_id")  };

  return this.http.post('https://ivrinfocuit.herokuapp.com/Getchannelcounts', body , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}  
Roomoccupancy(start_date,end_date,no_room): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  let body = { 
    "arrival_from":start_date,
    "arrival_to":end_date,
    "type":no_room,
    "business_id":this.session.retrieve("business_id") 
     } 
console.log("room occupancy",body)
  return this.http.post('https://ivrinfocuit.herokuapp.com/GetRoomOccupancyall', body , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

BookingvsConfirmation(start_date,end_date): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  let body = { "arrival_from":start_date,
  "arrival_to":end_date,
  "business_id":this.session.retrieve("business_id")  };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetBookingConfirmation', body , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

Languages(start_date,end_date): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  let body = {  "arrival_from":start_date,
  "arrival_to":end_date,
  "business_id":this.session.retrieve("business_id") };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetLanguagecount', body , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

Sms(start_date,end_date): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  let body = {  "arrival_from":start_date,
  "arrival_to":end_date,
  "business_id":this.session.retrieve("business_id") };

  return this.http.post('https://ivrinfocuit.herokuapp.com/Getsmscount', body , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

countryreservation(start_date,end_date,no_room): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  let body = {	"arrival_from":start_date,
  "arrival_to":end_date,
 
  "business_id":this.session.retrieve("business_id"),
  "type":no_room};

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetCountryreservation', body , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

yearreservation(): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  let body = { "business_id": this.session.retrieve("business_id") };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetYearbyyeareservationcount',body,   options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}
monthreservation(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/monthreservation', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

  //statistics details
  statistics(statisticsddata: any): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/QueryStatistics', statisticsddata , options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }  
  futurebooking(no_room): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    let body = {  "business_id": this.session.retrieve("business_id"),
    "type":no_room
  };

    return this.http.post('https://ivrinfocuit.herokuapp.com/futurebooking',body,  options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  } 
  Historybooking(no_room): Observable<object[]> {
   console.log("history_booking",no_room)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    let body = {   "business_id": this.session.retrieve("business_id"),
    "type":no_room
   };
   console.log("history_booking*******************",body)

    return this.http.post('https://ivrinfocuit.herokuapp.com/HistoryBooking',body,  options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  } 
  
  convergencereport(start_date,end_date): Observable<object[]> {
    console.log("history_booking",start_date)
     const headers = new Headers({ 'Content-Type': 'application/json' })
     const options = new RequestOptions({ headers: headers });
     let body = {
      "arrival_from":start_date,
      "arrival_to":end_date,
      "business_id": this.session.retrieve("business_id")
       }
    console.log("history_booking*******************",body)
 
     return this.http.post('https://ivrinfocuit.herokuapp.com/GetConvergencereport',body,  options)
       .map(this.extractData)
     //.catch(this.handleErrorObservable);
   } 
  private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---====' + res);
    let body = res.json();
    console.log(JSON.stringify(body));
    return body;
  }

}

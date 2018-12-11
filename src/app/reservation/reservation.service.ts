import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SessionStorageService } from "ngx-webstorage";

@Injectable()
export class ReservationService {

  constructor( private http: Http,public session: SessionStorageService) { }
  reservationdetails(): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    let body = { "business_id":this.session.retrieve("business_id") };

    return this.http.post('https://ivrinfocuit.herokuapp.com/Query_Reservation',body,options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }

  getreservationtable(Confirmation): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    let body = {
       "business_id":this.session.retrieve("business_id"),
       "conf_num":Confirmation
      };
console.log("........",body);
    return this.http.post('https://ivrinfocuit.herokuapp.com/Query_Rate_Per_day',body,options)
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

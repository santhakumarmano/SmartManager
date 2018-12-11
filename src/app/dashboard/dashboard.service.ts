import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SessionStorageService } from "ngx-webstorage";

@Injectable()
export class DashboardService {

  constructor(
    private http: Http,public session: SessionStorageService
  ) { }

  dashBoardNotification():Observable<object[]>{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let body={"business_id":this.session.retrieve("business_id").toString(),}
    return this.http.post('https://ivrinfocuit.herokuapp.com/Dashboard_report',body,options)
    .map(this.extractData)
  }

  
  dashBoardChat():Observable<object[]>{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let body={"business_id":this.session.retrieve("business_id").toString(),}
    return this.http.post('https://ivrinfocuit.herokuapp.com/lastchannelrecord',body,options)
    .map(this.extractData)
  }

  //registration details
  dashboardDetails(dashbrddata: any): Observable<object[]> {
    
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/AvailableRoomCount', dashbrddata , options)
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


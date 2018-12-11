import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SessionStorageService } from "ngx-webstorage";

@Injectable()
export class MenusService {

  constructor(private http: Http,public session: SessionStorageService) { }

  dashBoardToolbar():Observable<object[]>{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let body={"business_id":this.session.retrieve("business_id").toString(),}
    return this.http.post('https://ivrinfocuit.herokuapp.com/lastreservationcount',body,options)
    .map(this.extractData)
  }
  
  private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---====' + res);
    let body = res.json();
    console.log(JSON.stringify(body));
    return body;
  }
}

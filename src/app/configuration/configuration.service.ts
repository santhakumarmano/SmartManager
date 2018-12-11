import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SessionStorageService } from "ngx-webstorage";
@Injectable()
export class ConfigurationService {

    constructor(
        private http: Http,public session: SessionStorageService
    ) { }

//update services
updateservice(room,rmsize,maxadult,maxchild,beding,bedsize,extrabeds,amenitie,photo,minprice,smoke,rmid): Observable<object[]>{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let body={"business_id":this.session.retrieve("business_id").toString(),
        "room_id":rmid,
	"room_name":room,
	"max_adults":maxadult,
	"max_child":maxchild,
	"room_size_id":rmsize,
	"bedding_options_id":beding,
	"maximum_extrabed_id":extrabeds,
	"bed_size_id":bedsize,
	"upload_photos":photo,
	"room_amenities_id":amenitie,
	"smoking":smoke,
	"rate_plan_id":0,
	"advance_booking_window":"",
	"prepayment_policy":"",
	"cancellation_policy":"",
	"inculsions_id":0,
	"important_information":"",
	"min_price":minprice
    }
    console.log(JSON.stringify(body));
    return this.http.post('https://ivrinfocuit.herokuapp.com/update_configuration', body, options)
    .map(this.extractData);
}

    // registration details
    configurationDetails(regdata: any): Observable<object[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = {
            'username': regdata.username, 'password': regdata.password,
            'email': regdata.email, 'mobileNo': regdata.mobileNo, 'businessid': regdata.businessid,
            'hotelname': regdata.hotelname
        };

        return this.http.post('https://ivrinfocuit.herokuapp.com/springMVC/commonService', body, options)
            .map(this.extractData);

    }

    /**----------------------------------------------------------------
     |InsertRoom Start
     |Business_id should be passed from login credentials(should check)
     |rate_plan_id should have to hardcode right now
     ------------------------------------------------------------------*/
    insertRoomDetails(insertDet: any): Observable<object[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        let body = {
            "business_id":insertDet.business_id,
            "room_name":insertDet.room_name,
            "max_adults":parseInt(insertDet.max_adults),
            "max_child":parseInt(insertDet.max_child),
            "room_size_id":insertDet.room_size_id,
            "bedding_options_id":insertDet.bedding_option_id,
            "maximum_extrabed_id":insertDet.extrabed_id,
            "bed_size_id":insertDet.bed_size_id,
            "upload_photos":insertDet.upload_photos,
            "room_amenities_id":insertDet.amenitie_id,
            "smoking":insertDet.smoking,
            "rate_plan_id":1,
            "advance_booking_window":insertDet.advance_booking_window,
            "prepayment_policy":insertDet.prepayment_policy,
            "cancellation_policy":insertDet.cancellation_policy,
            "inculsions_id":insertDet.inclusion_id,
            "important_information":insertDet.important_information,
            "min_price":insertDet.min_price
        }
        console.log("body value",body)
        return this.http.post('https://ivrinfocuit.herokuapp.com/insert_configuration', body, options)
            .map(this.extractData);

    }
    /**----------------------------------------------------------------
     |InsertRoom End
     |
     ------------------------------------------------------------------*/

    //get room details
    // insert room details
    getRoomDetails(): Observable<object[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        let body={"business_id":this.session.retrieve("business_id").toString()}

        return this.http.post('https://ivrinfocuit.herokuapp.com/select_configuration',body, options)
            .map(this.extractData);

    }
    //get room details
    /**----------------------------------------------------------------
     |Room Size Select Start
     ------------------------------------------------------------------*/
    getRoom(): Observable<object[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        let body={
            "business_id":this.session.retrieve("business_id").toString(),
        }
        return this.http.post('https://ivrinfocuit.herokuapp.com/SelectRoomsizeConfiguration',body,options)
            .map(this.extractData);
    }
    /**-----------------------------------------------------------
    |Room Size Select Ends
    ------------------------------------------------------------------*/



    /**----------------------------------------------------------------
    |Bedding Select Start
    ------------------------------------------------------------------*/
    getBedding(): Observable<object[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        let body={
            "business_id":this.session.retrieve("business_id").toString(),
        }
        return this.http.post('https://ivrinfocuit.herokuapp.com/SelectBeddingoptionsConfiguration',body,options)
            .map(this.extractData);
    }
    /**-----------------------------------------------------------
    |Bedding Select Ends
    ------------------------------------------------------------------*/



    /**----------------------------------------------------------------
    |BeddingSize Select Start
    ------------------------------------------------------------------*/
    getBeddingSize(): Observable<object[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        let body={
            "business_id":this.session.retrieve("business_id").toString(),
        }
        return this.http.post('https://ivrinfocuit.herokuapp.com/SelectBedsizeConfiguration',body,options)
            .map(this.extractData);
    }
    /**-----------------------------------------------------------
    |BeddingSize Select Ends
    ------------------------------------------------------------------*/

    /**----------------------------------------------------------------
    |ExtraBed Select Start
    ------------------------------------------------------------------*/
    getExtraBed(): Observable<object[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        let body={
            "business_id":this.session.retrieve("business_id").toString(),
        }
        return this.http.post('https://ivrinfocuit.herokuapp.com/SelectExtrabed',body,options)
            .map(this.extractData);
    }
    /**-----------------------------------------------------------
    |ExtraBed Select Ends
    ------------------------------------------------------------------*/

    /**----------------------------------------------------------------
    |RoomAmenities Select Start
    ------------------------------------------------------------------*/
    getRoomAmenities(): Observable<object[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        let body={
            "business_id":this.session.retrieve("business_id").toString(),
        }
        return this.http.post('https://ivrinfocuit.herokuapp.com/SelectRoomamenitieConfiguration',body,options)
            .map(this.extractData);
    }
    /**-----------------------------------------------------------
    |RoomAmenities Select Ends
    ------------------------------------------------------------------*/

    
    /**----------------------------------------------------------------
    |Inclusion Select Start
    ------------------------------------------------------------------*/
    getInclusion(): Observable<object[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

     
        return this.http.get('https://ivrinfocuit.herokuapp.com/SelectInclusionsConfiguration')
            .map(this.extractData);
    }
    /**-----------------------------------------------------------
    |Inclusion Select Ends
    ------------------------------------------------------------------*/


    selectroomtype(): Observable<object[]> {
        console.log("service is cam")
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({ headers: headers });
        let body = { "business_id":this.session.retrieve("business_id") };
        
        return this.http.post('https://ivrinfocuit.herokuapp.com/select_room_types',body, options)
          .map(this.extractData)
        //.catch(this.handleErrorObservable);
      }
      cancellationpolicy(): Observable<object[]> {
        console.log("service is cam")
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({ headers: headers });
      
    
        return this.http.post('https://ivrinfocuit.herokuapp.com/select_cancellation_policy', options)
          .map(this.extractData)
        //.catch(this.handleErrorObservable);
      }
      selectrateplan(): Observable<object[]> {
        console.log("service is cam")
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({ headers: headers });
        let body = { "business_id":this.session.retrieve("business_id") };
    
        return this.http.post('https://ivrinfocuit.herokuapp.com/select_rateplanid',body, options)
          .map(this.extractData)
        //.catch(this.handleErrorObservable);
      }
      packages(): Observable<object[]> {
        console.log("service is cam")
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({ headers: headers });
        let body={
            "business_id":this.session.retrieve("business_id").toString(),
        }
    
        return this.http.post('https://ivrinfocuit.herokuapp.com/select_packages',body, options)
          .map(this.extractData)
        //.catch(this.handleErrorObservable);
      }
      create_rate_planss(params): Observable<object[]> {
        console.log("service is cam")
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({ headers: headers });
        console.log("service came",params)
    
        return this.http.post('https://ivrinfocuit.herokuapp.com/create_rate_plan',params, options)
          .map(this.extractData)
        //.catch(this.handleErrorObservable);
      }
      view_rateplan(): Observable<object[]> {
        console.log("service is cam")
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({ headers: headers });
        let body = {
            "business_id":this.session.retrieve("business_id").toString()
        }
        console.log("service came",body)
    
        return this.http.post('https://ivrinfocuit.herokuapp.com/select_rate_plan',body, options)
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
    //   image Upload 
    postFile(formData: any): Observable<object[]> {

        // const headers = new Headers({ 'Content-Type': 'multipart/form-data' })
        // const options = new RequestOptions({ headers: headers });
        // let body = { "Image": fileToUpload };
    
        return this.http.post('https://ivrinfocuit.herokuapp.com/upload', formData)
          .map(this.extractData)
        //.catch(this.handleErrorObservable);
      }
    
    }

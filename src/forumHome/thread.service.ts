/**
 * Created by Petr on 29.12.2016.
 */
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Thread} from "./thread";  // model vlakna se vsemi parametry

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ThreadService {
  // Resolve HTTP using the constructor
  constructor (private http: Http) {}
  // private instance variable to hold base url
  private url = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';



  getThreadsFromServer() : Observable<Thread[]> {

    // ...using get request
    return this.http.get(this.url)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json());
      //...errors if any
      //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


}










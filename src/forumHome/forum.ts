import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Thread } from './thread';
import { User } from '../_models/index';
//import {ThreadService} from "./thread.service";
const styles = require('./forum.css');
const template = require('./forum.html');

import 'rxjs/add/operator/toPromise';
import {contentHeaders} from "../common/headers";
// import {Observable} from "rxjs";


export interface type{
  id:number;
  text:string;
}

@Component({
  selector: 'forum',
  template: template,
  styles: [ styles ]
})

// pro moznost pouzivani teto tridy se musi pridat :
//      import {Forum} from "./forumHome";    do    'app.route.ts'
//      { path: 'forum', component: Forum },    do    'app.route.ts'
//  Aby bylo mozne oznacovat formular '[formGroup]="myForm"' a jednotlive prvky v nem 'formControlName="firstName",
//    musi se pridat 'imports: [ReactiveFormsModule],' do 'app.module.ts'
export class Forum implements OnInit{
  currentUser: User;
  public myThreads: Thread[];   // pole s vlakny se naplni pri inicializaci
  public threads_error: Boolean = false;
  response: string;
  response2: string;
  response3: string;
  userLogName: string;
  userLogID: string;
  selectedThread: Thread;
  url: string = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';

   // public response:string ;
  isDataAvailable:boolean = false;

  ngOnInit() {
    let u = localStorage.getItem('currentUser');
    if (u == null){
      this.router.navigate(['login']);
    }

    this._callApi('ThreadsList', this.url);
    this.isDataAvailable = true;
    this.getThreads();
    //this.showResponse();


  }

  constructor(
    //private response: string,
    public http: Http,
    public authHttp: AuthHttp,
    private router: Router,

  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userLogName = this.currentUser.username + '';
     this.userLogID = this.currentUser.id + '';

  }




  getThreads() {

    this.http.get("http://127.0.0.2:3001/get_threads")
      .toPromise()
      .then((response) => {
        // this.getData = response.text();
        // this.getData = JSON.parse(response.text())[0].title;

        this.myThreads = [];
        let responseJson = JSON.parse(response.text()) ;
        let i = 0;
        for (i = 0; i < responseJson.length; i++){
          this.myThreads.push(
            {id: responseJson[i].id,
              id_author: responseJson[i].id_author,
              last_update: responseJson[i].last_update,
              title: responseJson[i].title,
              text: responseJson[i].text} );
        }

      });



  }
  deleteThread(id): void {
    let params = new URLSearchParams();
    params.set('id', id);
    this.http.get("http://127.0.0.2:3001/delete_thread", { search: params })
      .toPromise()
      .then((response) => {
        this.response2 = response.text();
        this.getThreads();
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
/*
  funkce ulozi vysledek pozadavku get, do promenne response az pote, co se vrati nejaky vysledek.
  ostatni ulohy nasledovane za touto konstrukci se vykonavaji asynchrone
  pokud bych chtel, aby se neco vykonalo az potom, co se naplni response odpovedi, musim to dat
  do dalsiho .than bloku
  return  this.http.get(url).toPromise()
.then(response => response.text()) ;

*/

  testovaci(){
    this.router.navigate(['testovaci']);
  }
  detail2(){
    this.router.navigate(['detail2']);
  }
  detail(){
    this.router.navigate(['detail']);
  }
  // onSelect(id, title, id_author, last_update, text){
  onSelect(id){
    // this.selectedThread = thread;
    var myfunc = function() {
    }
    myfunc();
    this.router.navigate(['detail', id]);
    // this.router.navigate(['detail', id, title, id_author, last_update, text]);
    // this.router.navigate(['detail']);
  }

  addThread(){
    this.router.navigate(['forumNew']);
  }




  _callApi(type, url): void {
    this.response2 = null;
    this.response3 = null;

    if (type === 'ThreadsList') {
;

    }

    if (type === 'get_thread') {

      ;
    }

    if (type === 'Json') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response3 = response.json(),
          error => this.response3 = error.text()
        );
    }

    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response2 = response.text(),
          error => this.response2 = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this.authHttp.get(url)
        .subscribe(
          response => this.response2 = response.text(),
          error => this.response2 = error.text()
        );
    }



  }

}

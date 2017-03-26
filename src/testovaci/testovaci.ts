import { Component } from '@angular/core';
// import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FormBuilder, Validators } from '@angular/forms';
import {routes} from "../app.routes";
import {HTTPTestService} from './http-test.service';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod, URLSearchParams} from '@angular/http';
import {Inject} from "angular2/core";
// import {
//   Http, Headers as AngularHeaders,
//   Request, RequestOptions, RequestMethod as RequestMethods,
//   Response,
//   URLSearchParams
// } from "angular2/http";
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

const styles = require('./testovaci.css');
const template = require('./testovaci.html');

@Component({
  selector: 'testovaci',
  template: template,
  styles: [ styles ]
})

// pro moznost pouzivani teto tridy se musi pridat :
//      import {Testovaci} from "./testovaci";    do    'app.route.ts'
//      { path: 'testovaci', component: Testovaci },    do    'app.route.ts'
export class Testovaci {
  getData:string;
  getPromiseData:string;
  postData:string;



  constructor(private router: Router, private _http:Http) { // private _httpService:HTTPTestService,
  }



  testApiCall(): any {
    return this._http.get('http://jsonplaceholder.typicode.com/users/1')
      .map((response) => {
        // some response manipulation

        return (response.json())
      })
      .toPromise();
  }


  onGet(){
    this.getData = new Date().valueOf().toString();
    //
    // unirest.post('http://mockbin.com/request')
    //   .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    //   .send({ "parameter": 23, "foo": "bar" })
    //   .end(function (response) {
    //     this.getData =(response.body);
    //   });
    //----------------------------------
    // var Client = require('node-rest-client').Client;
    // var client = new Client();
    //
    // client.get("http://jsonplaceholder.typicode.com/users/1",
    //   function (data, response) {
    //     // parsed response body as js object
    //     this.getData = data;
    //       console.log(data);
    //     // raw response
    //     this.postData = response.toString();
    //     console.log(response);
    //   });
    //----------------------------------

    // this.getData = this.testApiCall();
    //   console.log('Getting user now.');
    // let output;
    // this._http.get("http://127.0.0.2:3001/get_threads")
    //   // .toPromise()
    //   .subscribe((response) => {
    //     this.getData = response.text();
    //     // return (response.text())
    //   })
      // .toPromise();
    //++++++++++++++++++++++++++++++++++
    // this._http.get("http://127.0.0.2:3001/get_threads")
    //   .toPromise()
    //   .then((response) => {
    //     // this.getData = response.text();
    //     this.getData = JSON.parse(response.text())[0].title;
    //   });
    //++++++++++++++++++++++++++++++++++++

    //++++++++++++

    // .subscribe(res => this.getData = JSON.parse(res.text()).title);
    // this.getData = JSON.parse(o);
    // ++++++++++++++++
    //  this._http.get("http://jsonplaceholder.typicode.com/users/1")
    //    .toPromise()
    //    .then(res => this.getData = JSON.parse(res.text()).name);
    // ++++++++++++++++
       // .then(res=>res.text());
      // .map(res=>res.json());
    // this.getData  = JSON.stringify(output);
    // this.getData  = output.toString();
  };

  onPromiseGet(){
    // var output = this._http.get("http://jsonplaceholder.typicode.com/users")
    //+++++++++++++++++++++++++++++++++++++++++++++++
    let params = new URLSearchParams();
    params.set('id', '29');
    this._http.get("http://127.0.0.2:3001/get_one_thread", { search: params })
      .toPromise()
      .then((response) => {
        this.getPromiseData = response.text();
      });
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // this._http.get("http://127.0.0.2:3001/get_users")
    //   .toPromise()
    //   .then((response) => {
    //     this.getPromiseData = response.text();
    //   });
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // var json = JSON.stringify({
    //   user: 'petr',
    //   passw: '12345'
    // });
    // var params = 'data=' + json;
    // var header = new Headers();
    // header.append('Content-type', 'application/x-www-form-urlencoded');
    //
    // this._http.post("http://127.0.0.2:3001/get_one_user", params, {headers:header} )//'data='+JSON.stringify(jj)
    //   .toPromise()
    //   .then((response) => {
    //     this.getPromiseData = response.text();
    //   });
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // let params = new URLSearchParams();
    // params.set('id', '2');
    // this._http.get("http://127.0.0.2:3001/get_userByID", { search: params })
    //   .toPromise()
    //   .then((response) => {
    //     this.getPromiseData = response.text();
    //   });
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // var json = JSON.stringify({
    //   user: 'petr3633',
    //   password: 'wwwww'
    // });
    // var params = 'data=' + json;
    // var header = new Headers();
    // header.append('Content-type', 'application/x-www-form-urlencoded');
    //
    // this._http.post("http://127.0.0.2:3001/add_user", params, {headers:header} )//'data='+JSON.stringify(jj)
    //   .toPromise()
    //   .then((response) => {
    //     this.getPromiseData = response.text();
    //     if (JSON.parse(response.text()).error){
    //       this.getData = "ERROR - user already exist";
    //     }else this.getData = "OK";
    //   });
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // var json = JSON.stringify({
    //   id_author: '14',
    //   last_update: '1234567890',
    //   title: 'toto je testovaci clanek',
    //   text: 'toto je TEXT testovaciho clanku'
    // });
    // var params = 'data=' + json;
    // var header = new Headers();
    // header.append('Content-type', 'application/x-www-form-urlencoded');
    //
    // this._http.post("http://127.0.0.2:3001/add_thread", params, {headers:header} )//'data='+JSON.stringify(jj)
    //   .toPromise()
    //   .then((response) => {
    //     this.getPromiseData = response.text();
    //   });
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // let params = new URLSearchParams();
    // params.set('id', '19');
    // this._http.get("http://127.0.0.2:3001/delete_thread", { search: params })
    //   .toPromise()
    //   .then((response) => {
    //     this.getPromiseData = response.text();
    //   });
    //+++++++++++++++++++++++++++++++++++++++++++++++
  }
  // onGet(){
  //   console.log('Getting user now.');
  //   this._httpService.getUser().subscribe(
  //     data =>this.getData = JSON.stringify(data),
  //     error=>alert(error),
  //     ()=>console.log('Finished Get')
  //   );
  // }
  //
  // onPromiseGet(){
  //   console.log('Getting user based on promise now.');
  //   this._httpService.getUsersByPromise()
  //     .then(
  //       res=>this.getPromiseData = JSON.stringify(res),
  //       err=>alert(err)
  //     );
  //
  // }
  //
  // onPost(){
  //   this._httpService.postJson().subscribe(
  //     data =>this.postData = JSON.stringify(data),
  //     error=>alert(error),
  //     ()=>console.log('Finished Post')
  //   );
  // }

  back(){
    this.router.navigate(['forumHome']);
  }
}

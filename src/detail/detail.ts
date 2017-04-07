import {Component, OnDestroy, OnInit} from '@angular/core';
// import { Http } from '@angular/http';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Thread } from '../forumHome/thread';
const styles = require('./detail.css');
const template = require('./detail.html');

import { routes } from '../app.routes';

@Component({
  selector: 'detail',
  template: template,
  styles: [ styles ]
})

// pro moznost pouzivani teto tridy se musi pridat :
//      import {Forum} from "./forumHome";    do    'app.route.ts'
//      { path: 'forum', component: Forum },    do    'app.route.ts'
//  Aby bylo mozne oznacovat formular '[formGroup]="myForm"' a jednotlive prvky v nem 'formControlName="firstName",
//    musi se pridat 'imports: [ReactiveFormsModule],' do 'app.module.ts'
export class Detail implements OnInit, OnDestroy  {
  id: number;
  title2: string;
  id_author: string;
  last_update: string;
  text: string;
  private sub: any;

  testtext: string;


  myForm: FormGroup;  // slouzi pro validaci formulare

  title = new FormControl('', Validators.required);// slouzi pro validaci formulare
  message = new FormControl('', Validators.required);

  constructor(fb: FormBuilder,
              private router: Router,
              public http: Http,
              private route: ActivatedRoute) {
    this.myForm = fb.group({
      'message': this.message
      // 'title': this.title,
    }); // slouzi pro validaci formulare

  }
  ngOnInit() {
      let u = localStorage.getItem('currentUser');
      if (u == null){
        this.router.navigate(['login']);
      }


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number


    });
    this.get_thread2();
  }


  get_thread2(){
    this.testtext = '<h1>html...</h1>';
    let params = new URLSearchParams();
    params.set('id', this.id.toString());
    this.http.get("http://pwa.eu-2.evennode.com/get_one_thread", { search: params })//, { search: params }
      .toPromise()
      .then((response) => {
        let responseJson = JSON.parse(response.text()) ;

        this.title2 = responseJson.title;
        this.last_update = new Date(responseJson.last_update.valueOf() * 1000).toLocaleString() ;
        this.text = responseJson.text;

        params = new URLSearchParams();
        params.set('id', responseJson.id_author);
        this.http.get("http://pwa.eu-2.evennode.com/get_userByID", { search: params })
          .toPromise()
          .then((response2) => {
            this.id_author = JSON.parse(response2.text())[0].user;
          });

      });


  }

  updateThread(){
    var json = JSON.stringify({
      id: this.id.toString(),
      last_update: (new Date().valueOf() / 1000 | 0).toString(),
      text: this.text + "<br><u><b><i>" + JSON.parse(localStorage.getItem('currentUser')).username + ":</i></b></u><br>" +
      "<span class='aaa'>"+this.message.value+'</span>'
    });
    var params = 'data=' + json;
    var header = new Headers();
    header.append('Content-type', 'application/x-www-form-urlencoded');

    this.http.post("http://pwa.eu-2.evennode.com/update_thread", params, {headers:header} )//'data='+JSON.stringify(jj)
      .toPromise()
      .then((response) => {

        let responseJson = JSON.parse(response.text()) ;
        this.last_update = new Date(responseJson.last_update.valueOf() * 1000).toLocaleString() ;
        this.text = responseJson.text;
        this.back();
        // this.get_thread2();
        // this.ngOnInit();
        // this.reset();
      });
    // this.ngOnInit();
  }

  back(){
    this.router.navigate(['forumHome']);
  }
  reset() {
    this.myForm.reset();
    this.myForm.clearValidators();
    // this.message.reset();
  }
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}

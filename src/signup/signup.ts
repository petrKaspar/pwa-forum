import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers} from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ]
})
export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password) {

    var json = JSON.stringify({
      user: username,
      password: password
    });
    var params = 'data=' + json;
    var header = new Headers();
    header.append('Content-type', 'application/x-www-form-urlencoded');

    this.http.post("http://127.0.0.2:3001/add_user", params, {headers:header} )//'data='+JSON.stringify(jj)
      .toPromise()
      .then((response) => {

        this.router.navigate(['login']);

        // if (JSON.parse(response.text()).error){
        //
        // }else {
        // }
      });

  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}

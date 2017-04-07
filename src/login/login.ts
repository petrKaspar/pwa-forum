import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {Http, Headers} from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles   = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [ styles ]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "username": username
      }
    };


    var json = JSON.stringify({
      user: username,
      passw: password
    });
    var params = 'data=' + json;
    var header = new Headers();
    header.append('Content-type', 'application/x-www-form-urlencoded');

    let id_user;
    this.http.post("http://pwa.eu-2.evennode.com/get_one_user", params, {headers:header} )//'data='+JSON.stringify(jj)
      .toPromise()
      .then((response) => {
      if (response.text().length != 0){
        id_user = JSON.parse(response.text()).id;

        let user = {
          id: id_user,
          username: username,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));  // docasne

        if (!id_user.isEmpty){
          this.router.navigate(['forumHome']);
        }


      }

      });

  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}

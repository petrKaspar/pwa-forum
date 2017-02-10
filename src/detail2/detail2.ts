import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FormBuilder, Validators } from '@angular/forms';
import {routes} from "../app.routes";

const styles = require('./detail2.css');
const template = require('./detail2.html');

@Component({
  selector: 'detail2',
  template: template,
  styles: [ styles ]
})

// pro moznost pouzivani teto tridy se musi pridat :
//      import {Testovaci} from "./testovaci";    do    'app.route.ts'
//      { path: 'testovaci', component: Testovaci },    do    'app.route.ts'
export class Detail2 {

  constructor(private router: Router) {
  }

  back(){
    this.router.navigate(['forumHome']);
  }
}

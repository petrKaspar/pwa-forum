import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FormBuilder, Validators } from '@angular/forms';
import {routes} from "../app.routes";

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

  constructor(private router: Router) {
  }

  back(){
    this.router.navigate(['forumHome']);
  }
}

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {User} from '../_models/user';

const styles = require('./forumNew.css');
const template = require('./forumNew.html');

@Component({
  selector: 'forumNew',
  template: template,
  styles: [ styles ]
})

// pro moznost pouzivani teto tridy se musi pridat :
//      import {Forum} from "./forumHome";    do    'app.route.ts'
//      { path: 'forum', component: Forum },    do    'app.route.ts'
//  Aby bylo mozne oznacovat formular '[formGroup]="myForm"' a jednotlive prvky v nem 'formControlName="firstName",
//    musi se pridat 'imports: [ReactiveFormsModule],' do 'app.module.ts'
export class ForumNew {
  myForm: FormGroup;
  currentUser: User;

  firstName = new FormControl('', Validators.required);
  title = new FormControl('', Validators.required);
  message = new FormControl('', Validators.required);
  thread = new FormControl('', Validators.required);

  constructor(fb: FormBuilder, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.firstName.setValue(this.currentUser.username+'');
    this.myForm = fb.group({
      'firstName': this.firstName,
      'message': this.message,
      'title': this.title,
      'thread': this.thread
    });

  }

  onSubmitModelBased() {
    console.log('model-based form submitted');
    console.log(this.myForm);
  }

  reset() {
    this.myForm.reset();
     this.myForm.clearValidators();
    // this.message.reset();
  }
  back(){
    this.router.navigate(['forumHome']);
  }

}

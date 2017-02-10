import {Component, OnDestroy, OnInit} from '@angular/core';
// import { Http } from '@angular/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
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

  myForm: FormGroup;  // slouzi pro validaci formulare

  title = new FormControl('', Validators.required);// slouzi pro validaci formulare
  message = new FormControl('', Validators.required);

  constructor(fb: FormBuilder,
              private router: Router,
              public http: Http,
              private route: ActivatedRoute) {
    this.myForm = fb.group({
      'message': this.message,
      'title': this.title,
    }); // slouzi pro validaci formulare

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // this.title = +params['title']; // (+) converts string 'id' to a number
      // this.id_author = +params['id_author']; // (+) converts string 'id' to a number
      // this.last_update = +params['last_update']; // (+) converts string 'id' to a number
      // this.text = +params['text']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.

    });
    this.get_thread2();
  }

  // public myThreads: Thread[];   // pole s vlakny se naplni pri inicializaci
  // public threads_error: Boolean = false;
  // response: string;
  // response2: string;
  // response3: string;
  // selectedThread: Thread;
  // url: string = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';
  // // public response:string ;
  // isDataAvailable:boolean = false;

  get_thread2(){
    let query = "q={\"id\": \""+this.id+"\"}";
    let url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?' + query + '&apiKey=9I-wGKTgFqP8A5IJ6zP_jKl0Phgz5B9r';
      this.http.get(url_mongoDB)
      .toPromise()
      .then(response => {
        // this.response2 = response.text();
        // console.log('----------------- '+response.text() );

        // var aaa = '{[ { "_id" : { "$oid" : "589cd22ac2ef162b33d7a296"} , "id" : "1" , "id_author" : "2" , "last_update" : "1482965255" , "title" : "Lorem ipsum dolor " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd248bd966f2cc1c43eaf"} , "id" : "2" , "id_author" : "1" , "last_update" : "1482965259" , "title" : "Lorem ipsum gaude" , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd264c2ef162b33d7a2d7"} , "id" : "3" , "id_author" : "1" , "last_update" : "1482965321" , "title" : "Consectetur adipiscing " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd28bbd966f2cc1c43f43"} , "id" : "4" , "id_author" : "1" , "last_update" : "1482965339" , "title" : " Laboris nisi ut" , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd29dbd966f2cc1c43f58"} , "id" : "5" , "id_author" : "3" , "last_update" : "1482965439" , "title" : " Duis aute irure " , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd2c6c2ef162b33d7a528"} , "id" : "6" , "id_author" : "1" , "last_update" : "1482965439" , "title" : "Excepteur sint occaecat " , "text" : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"} , { "_id" : { "$oid" : "589cd2e3bd966f2cc1c4442a"} , "id" : "7" , "id_author" : "2" , "last_update" : "1482965439" , "title" : "Sed ut perspiciatis unde omnis iste" , "text" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"} , { "_id" : { "$oid" : "589cd306bd966f2cc1c44444"} , "id" : "8" , "id_author" : "3" , "last_update" : "1482965589" , "title" : "Nemo enim ipsam voluptatem quia" , "text" : "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"} , { "_id" : { "$oid" : "589cd323bd966f2cc1c4445f"} , "id" : "9" , "id_author" : "4" , "last_update" : "1482965799" , "title" : "Neque porro quisquam est" , "text" : "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"} , { "_id" : { "$oid" : "589cd34cc2ef162b33d7a5a6"} , "id" : "10" , "id_author" : "3" , "last_update" : "1482966099" , "title" : "At vero eos et accusamus et iusto odio dignissimos " , "text" : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd367c2ef162b33d7a5c2"} , "id" : "11" , "id_author" : "1" , "last_update" : "1482966199" , "title" : "Et harum quidem rerum " , "text" : "Et harum quidem rerum facilis est et expedita distinctio, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd3c6c2ef162b33d7a63a"} , "id" : "14" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3ccc2ef162b33d7a640"} , "id" : "15" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3e4bd966f2cc1c4452c"} , "id" : "16" , "id_author" : "2" , "last_update" : "1482966399" , "title" : "similique sunt in deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd384bd966f2cc1c444b1"} , "id" : "12" , "id_author" : "5" , "last_update" : "1482966199" , "title" : "Itaque earum rerum hic tenetur" , "text" : "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"} , { "_id" : { "$oid" : "589cd3aabd966f2cc1c444e4"} , "id" : "13" , "id_author" : "6" , "last_update" : "1482966339" , "title" : "Blanditiis praesentium" , "text" : "dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"} ]}'


        let responseJson = JSON.parse(response.text()) ;

        this.title2 = responseJson[0].title;
        this.id_author = responseJson[0].id_author;
        this.last_update = responseJson[0].last_update;
        this.text = responseJson[0].text;

        // let i = 0;
        // for (i = 0; i < responseJson.length; i++){
        //   this.myThreads.push(
        //     {id: responseJson[i].id,
        //       id_author: responseJson[i].id_author,
        //       last_update: responseJson[i].last_update,
        //       title: responseJson[i].title,
        //       text: responseJson[i].text} );
        // }

      });
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

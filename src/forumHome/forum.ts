import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
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
import {Observable} from "rxjs";


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
  selectedThread: Thread;
  url: string = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';
  // url: string = 'http://forumpwa.eu-2.evennode.com';

   // public response:string ;
  isDataAvailable:boolean = false;

  ngOnInit() {
   // this.getThreads();
    //this.loadThreads()
    // this._callApi('ThreadsList', this.url).then(() =>
    //   this.isDataAvailable = true); // Now has value;
    this._callApi('ThreadsList', this.url);
    this.isDataAvailable = true;
    this.getThreads();
    //this.showResponse();
  }

  //constructor(private _demoService: DemoService) { }
  //constructor(public http: Http, private threadService: ThreadService) { }

  constructor(
    //private response: string,
    public http: Http,
    public authHttp: AuthHttp,
    private router: Router,

    // routeParams: RouteParams,
    // private route: ActivatedRoute
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userLogName = this.currentUser.username + '';
    // this.userLogName = routeParams.params;
    // this.route.queryParams.subscribe(params => {
    //   this.userLogName = params["username"];
    // });

  }

  // public myThreads: Thread[] = [
  //   {id: 1, id_author: 5, last_update: '123', title: 'AAAAAAA AAAA', text: 'Sentence 1'},
  //   {id: 2, id_author: 5, last_update: '789', title: 'BBBBBBB bb', text: 'Sentence 2 asssssssd a'},
  //   {id: 3, id_author: 1, last_update: '456', title: 'CCCCCCC CCC C', text: 'Sentence 3dddddddd sd 3333'},
  //   {id: 4, id_author: 3, last_update: '36698', title: 'DDDDD d d', text: 'Sentence 444444444444'}
  // ];

  //// funguje
  // threads = [
  //   {id: 1,name: 'Windstorm'},
  //   {id: 2,name: 'aaaaaaaaaa'},
  //
  // ];



  // threads = [
  //   new Thread(1,'aaaaaaaaaaaaaaaasas'),
  //   new Thread(2, 'qqqqqqwwwwwwwws'),
  //   new Thread(15, 'sdfrfsd '),
  //   new Thread(42, 'rrrrrrgggggg')
  // ];

  //threads=["aaa","bbb", "ccccc"];


  // threads = [
  //   new Thread(1, 2, 'saedf', 'Windstorm', 'aaaaaaaaaaaaaaaaaaa a      sas '),
  //   new Thread(2, 3, 'fe','Bombasto', 'qqqqqqwwwwwwwws sd asdf sdf s'),
  //   new Thread(15, 5, 'wef','Magneta', 'sdf gd gdfg er hrfsd '),
  //   new Thread(42, 4, 'aaa','Tornado', 'rrrrrrrr gggggggg')
  // ];

  // loadThreads() {
  //   // Get all threads
  //   this.threadService.getThreadsFromServer()
  //     .subscribe(
  //       threads => this.myThreads = threads, //Bind to view
  //       err => {
  //         // Log errors if any
  //         console.log(err);
  //       });
  // }


  getThreads() {
    // this._demoService.getFoods().subscribe(
    //   data => { this.threads = data},
    //   err => { this.threads_error = true }
    // );

    // this.response = null;
    //
    // this.http.get(this.url)
    //   .subscribe(
    //     response => this.response = response.text(),
    //     error => this.response = error.text()
    //   );


    // this.response = JSON.parse(this.response)[2],'';
    // var parsed_result = JSON.parse(this.response);
    // this.response2 = this.response.json();

var a = '[ { "_id" : { "$oid" : "589cd22ac2ef162b33d7a296"} , "id" : "1" , "id_author" : "2" , "last_update" : "1482965255" , "title" : "Lorem ipsum dolor " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd248bd966f2cc1c43eaf"} , "id" : "2" , "id_author" : "1" , "last_update" : "1482965259" , "title" : "Lorem ipsum gaude" , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"}]'

    this.myThreads = [
        {id: 0, id_author: 5, last_update: '2015-08-05', title: 'title 0', text: 'Sentence 1'},
        // {id: 2, id_author: 5, last_update: '789', title: 'BBBBBBB bb', text: 'Sentence 2 asssssssd a'},
        // {id: 3, id_author: 1, last_update: '456', title: 'CCCCCCC CCC C', text: 'Sentence 3dddddddd sd 3333'},
        // {id: 4, id_author: 3, last_update: '36698', title: 'DDDDDDDD dsd d', text: 'Sentence 444444444444'}
      ];
    this.myThreads = [];
    let responseJson = JSON.parse(a) ;
    let i = 0;
    for (i = 0; i < responseJson.length; i++){
      this.myThreads.push(
        {id: responseJson[i].id,
          id_author: responseJson[i].id_author,
          last_update: responseJson[i].last_update,
          title: responseJson[i].title,
          text: responseJson[i].text} );
    }

    // this.myThreads.push( {id: 5, id_author: 3, last_update: '36698', title: 'EEEEEEEEEEEE', text: 'Sentence 444444444444'} )


    // if (this.isDataAvailable == true){
    //   if (this.response2 != null){
    //
    //   var responseJson = JSON.parse(this.response2);
    //
    //   var i = 0;
    //   for (i = 0; i < responseJson.data.length; i++){
    //     this.myThreads.push( {id: responseJson.data[i].id,
    //       id_author: responseJson.data[i].id_author,
    //       last_update: responseJson.data[i].last_update,
    //       title: responseJson.data[i].title,
    //       text: responseJson.data[i].text} );
    //   }
    //
    // }


  }

  showResponse() {
      /*
       { "data": [ { "id": "1", "id_author": "5", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 1", "text": "asdf asdf asdf asdfasddfiiiiiiiii yui p", },
       { "id": "2", "id_author": "5", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 2", "text": "gy oikgmj yu fyui fdyujfdyj", },
       { "id": "3", "id_author": "2", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 3", "text": "gkikghkgh jkgh 3213213", },
       { "id": "4", "id_author": "1", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 4", "text": "dfhgdfhg fhdfgh66 dfgh6 666 dfhgdf", }
       ] }
       */

    //this.response2 = JSON.parse(this.response2['data'], (key, value))[0];
    //this.response2 += value;
   // var jsontext = '{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}';
    //var aaa = '{ "data": [ { "id": "1", "id_author": "5", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 1", "text": "asdf asdf asdf asdfasddfiiiiiiiii yui p" }, { "id": "2", "id_author": "5", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 2", "text": "gy oikgmj yu fyui fdyujfdyj" }, { "id": "3", "id_author": "2", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 3", "text": "gkikghkgh jkgh 3213213" }, { "id": "4", "id_author": "1", "last_update": "2015-08-05T08:40:51.620Z", "title": "title 4", "text": "dfhgdfhg fhdfgh66 dfgh6 666 dfhgdf" } ] }'
    // var responseJson = JSON.parse(this.response2);
    //this.myThreads = [];

    // let responseJson = JSON.parse(this._callApi2(this.url)) ;
    //this.response3 = responseJson.data[2].title + ", " + responseJson.data[0].text+ ", " + responseJson.data[0].id;
    // this.response3 +=responseJson.phone[1];

    // var responseJson = JSON.parse(this.response2);

    //var responseJson = JSON.parse(this.response2);

    //this.response2 = this._callApi2(this.url);

    // this.myThreads = [];
    // let responseJson = JSON.parse(this.response2) ;
    // let i = 0;
    // for (i = 0; i < responseJson.data.length; i++){
    //   this.myThreads.push( {id: responseJson.data[i].id,
    //     id_author: responseJson.data[i].id_author,
    //     last_update: responseJson.data[i].last_update,
    //     title: responseJson.data[i].title,
    //     text: responseJson.data[i].text} );
    // }

    }

  logout() {
    //localStorage.removeItem('id_token');
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
  _callApi2(url): Promise<String> {
    //var res = '';
    return  this.http.get(url).toPromise()
      .then(response => response.text()) ;
  }
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

  callAnonymousApi() {
    this._callApi('ThreadsList', this.url);
  }

  callApi_Json() {
    this._callApi('Json', this.url);
  }

  // get_thread2() {
  //   this._callApi('get_thread', this.url);
  // }


 //  getThreads2() : Observable<> {
 //    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
 //    let options       = new RequestOptions({ headers: headers }); // Create a request option
 //
 //    return this.http.post('http://127.0.0.2:3001/', '{ "action": "get_threads"}', options) // ...using post request
 //      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
 // }
  private extractData(res: Response) {
    let body = res.json();
    this.response2 = JSON.stringify(res.json());
    return body || { };
  }
  getThreads3() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://127.0.0.2:3001/', '{ "action": "get_threads"}', headers)
      .toPromise()
      .then(this.extractData)

  }

  _callApi(type, url): void {
    this.response2 = null;
    this.response3 = null;

    if (type === 'ThreadsList') {


      // this.myThreads = [];
      // // let responseJson = JSON.parse(response.json()) ;
      // // let responseJson = this.getThreads2() ;
      // let responseJson = this.getThreads3() ;
      // this.response2 = JSON.stringify(responseJson);
      // let i = 0;
      //       for (i = 0; i < responseJson.length; i++){
      //         this.myThreads.push(
      //           {id: responseJson[i].id,
      //           id_author: responseJson[i].id_author,
      //           last_update: responseJson[i].last_update,
      //           title: responseJson[i].title,
      //           text: responseJson[i].text} );
      //       }
      //===========================================================================================
      // let headers = new Headers({ 'Content-Type': 'application/json' });
      // this.http.post('http://127.0.0.2:3001/', '{ "action": "get_threads"}', headers)
      //   .subscribe(
      //     response => {
      //       // this.response2 = response.text();
      //       // this.response2 = response.json();
      //       // let responseJson = response.json() ;
      //       this.response2 = response.toString();
      //
      //       this.myThreads = [];
      //       let responseJson = JSON.parse(response.json()) ;
      //
      //       let i = 0;
      //       for (i = 0; i < responseJson.length; i++){
      //         this.myThreads.push(
      //           {id: responseJson[i].id,
      //           id_author: responseJson[i].id_author,
      //           last_update: responseJson[i].last_update,
      //           title: responseJson[i].title,
      //           text: responseJson[i].text} );
      //       }
      //
      //
      //     },
      //     error => {
      //       alert(error.text());
      //       console.log(error.text());
      //     }
      //   );
      console.log('///////////////////////////////////////////////////////////////////');
      //this.myThreads = null;
      // For non-protected routes, just use Http
  //    this.http.get(url).toPromise()
//      --------------------------------------------------------------------------------------------
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      var get_threads = { json: {action: "get_threads"} };
      // this.http.post('http://127.0.0.2:3001/', JSON.stringify({ action: 'get_threads'}), headers).toPromise()
      // this.http.get(url).toPromise()
      this.http.get('https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey=9I-wGKTgFqP8A5IJ6zP_jKl0Phgz5B9r').toPromise()
      // this.http.get('http://127.0.0.2:3001/').toPromise()
        .then(response => {
          this.response2 = response.text();
          // console.log('----------------- '+response.text() );

          // var aaa = '{[ { "_id" : { "$oid" : "589cd22ac2ef162b33d7a296"} , "id" : "1" , "id_author" : "2" , "last_update" : "1482965255" , "title" : "Lorem ipsum dolor " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd248bd966f2cc1c43eaf"} , "id" : "2" , "id_author" : "1" , "last_update" : "1482965259" , "title" : "Lorem ipsum gaude" , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd264c2ef162b33d7a2d7"} , "id" : "3" , "id_author" : "1" , "last_update" : "1482965321" , "title" : "Consectetur adipiscing " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd28bbd966f2cc1c43f43"} , "id" : "4" , "id_author" : "1" , "last_update" : "1482965339" , "title" : " Laboris nisi ut" , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd29dbd966f2cc1c43f58"} , "id" : "5" , "id_author" : "3" , "last_update" : "1482965439" , "title" : " Duis aute irure " , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd2c6c2ef162b33d7a528"} , "id" : "6" , "id_author" : "1" , "last_update" : "1482965439" , "title" : "Excepteur sint occaecat " , "text" : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"} , { "_id" : { "$oid" : "589cd2e3bd966f2cc1c4442a"} , "id" : "7" , "id_author" : "2" , "last_update" : "1482965439" , "title" : "Sed ut perspiciatis unde omnis iste" , "text" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"} , { "_id" : { "$oid" : "589cd306bd966f2cc1c44444"} , "id" : "8" , "id_author" : "3" , "last_update" : "1482965589" , "title" : "Nemo enim ipsam voluptatem quia" , "text" : "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"} , { "_id" : { "$oid" : "589cd323bd966f2cc1c4445f"} , "id" : "9" , "id_author" : "4" , "last_update" : "1482965799" , "title" : "Neque porro quisquam est" , "text" : "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"} , { "_id" : { "$oid" : "589cd34cc2ef162b33d7a5a6"} , "id" : "10" , "id_author" : "3" , "last_update" : "1482966099" , "title" : "At vero eos et accusamus et iusto odio dignissimos " , "text" : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd367c2ef162b33d7a5c2"} , "id" : "11" , "id_author" : "1" , "last_update" : "1482966199" , "title" : "Et harum quidem rerum " , "text" : "Et harum quidem rerum facilis est et expedita distinctio, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd3c6c2ef162b33d7a63a"} , "id" : "14" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3ccc2ef162b33d7a640"} , "id" : "15" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3e4bd966f2cc1c4452c"} , "id" : "16" , "id_author" : "2" , "last_update" : "1482966399" , "title" : "similique sunt in deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd384bd966f2cc1c444b1"} , "id" : "12" , "id_author" : "5" , "last_update" : "1482966199" , "title" : "Itaque earum rerum hic tenetur" , "text" : "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"} , { "_id" : { "$oid" : "589cd3aabd966f2cc1c444e4"} , "id" : "13" , "id_author" : "6" , "last_update" : "1482966339" , "title" : "Blanditiis praesentium" , "text" : "dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"} ]}'

          this.myThreads = [];
          let responseJson = JSON.parse(this.response2) ;
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
      // --------------------------------------------------------------------------------------------

      // .subscribe(
        //   response => this.response2 = response.text(),
        //   error => this.response2 = error.text()
        //  )


      // .then({
      //     //this.myThreads = [];
      //     let responseJson = JSON.parse(this.response2) ;
      //     let i = 0;
      //     for (i = 0; i < responseJson.data.length; i++){
      //       this.myThreads.push( {id: responseJson.data[i].id,
      //         id_author: responseJson.data[i].id_author,
      //         last_update: responseJson.data[i].last_update,
      //         title: responseJson.data[i].title,
      //         text: responseJson.data[i].text} );
      // }
      //
      // });
    }

    if (type === 'get_thread') {
      // For non-protected routes, just use Http
      // this.http.get(url)
      //   .toPromise()
      //   .then(response => {
      //     this.response2 = response.text();
      //     // console.log('----------------- '+response.text() );
      //
      //     // var aaa = '{[ { "_id" : { "$oid" : "589cd22ac2ef162b33d7a296"} , "id" : "1" , "id_author" : "2" , "last_update" : "1482965255" , "title" : "Lorem ipsum dolor " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd248bd966f2cc1c43eaf"} , "id" : "2" , "id_author" : "1" , "last_update" : "1482965259" , "title" : "Lorem ipsum gaude" , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd264c2ef162b33d7a2d7"} , "id" : "3" , "id_author" : "1" , "last_update" : "1482965321" , "title" : "Consectetur adipiscing " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd28bbd966f2cc1c43f43"} , "id" : "4" , "id_author" : "1" , "last_update" : "1482965339" , "title" : " Laboris nisi ut" , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd29dbd966f2cc1c43f58"} , "id" : "5" , "id_author" : "3" , "last_update" : "1482965439" , "title" : " Duis aute irure " , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd2c6c2ef162b33d7a528"} , "id" : "6" , "id_author" : "1" , "last_update" : "1482965439" , "title" : "Excepteur sint occaecat " , "text" : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"} , { "_id" : { "$oid" : "589cd2e3bd966f2cc1c4442a"} , "id" : "7" , "id_author" : "2" , "last_update" : "1482965439" , "title" : "Sed ut perspiciatis unde omnis iste" , "text" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"} , { "_id" : { "$oid" : "589cd306bd966f2cc1c44444"} , "id" : "8" , "id_author" : "3" , "last_update" : "1482965589" , "title" : "Nemo enim ipsam voluptatem quia" , "text" : "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"} , { "_id" : { "$oid" : "589cd323bd966f2cc1c4445f"} , "id" : "9" , "id_author" : "4" , "last_update" : "1482965799" , "title" : "Neque porro quisquam est" , "text" : "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"} , { "_id" : { "$oid" : "589cd34cc2ef162b33d7a5a6"} , "id" : "10" , "id_author" : "3" , "last_update" : "1482966099" , "title" : "At vero eos et accusamus et iusto odio dignissimos " , "text" : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd367c2ef162b33d7a5c2"} , "id" : "11" , "id_author" : "1" , "last_update" : "1482966199" , "title" : "Et harum quidem rerum " , "text" : "Et harum quidem rerum facilis est et expedita distinctio, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd3c6c2ef162b33d7a63a"} , "id" : "14" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3ccc2ef162b33d7a640"} , "id" : "15" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3e4bd966f2cc1c4452c"} , "id" : "16" , "id_author" : "2" , "last_update" : "1482966399" , "title" : "similique sunt in deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd384bd966f2cc1c444b1"} , "id" : "12" , "id_author" : "5" , "last_update" : "1482966199" , "title" : "Itaque earum rerum hic tenetur" , "text" : "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"} , { "_id" : { "$oid" : "589cd3aabd966f2cc1c444e4"} , "id" : "13" , "id_author" : "6" , "last_update" : "1482966339" , "title" : "Blanditiis praesentium" , "text" : "dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"} ]}'
      //
      //     this.myThreads = [];
      //     let responseJson = JSON.parse(this.response2) ;
      //     let i = 0;
      //     for (i = 0; i < responseJson.length; i++){
      //       this.myThreads.push(
      //         {id: responseJson[i].id,
      //           id_author: responseJson[i].id_author,
      //           last_update: responseJson[i].last_update,
      //           title: responseJson[i].title,
      //           text: responseJson[i].text} );
      //     }
      //
      //   });
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

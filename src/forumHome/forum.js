"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//import {ThreadService} from "./thread.service";
var styles = require('./forum.css');
var template = require('./forum.html');
require('rxjs/add/operator/toPromise');
var Forum = (function () {
    //constructor(private _demoService: DemoService) { }
    //constructor(public http: Http, private threadService: ThreadService) { }
    function Forum(
        //private response: string,
        http, authHttp, router) {
        this.http = http;
        this.authHttp = authHttp;
        this.router = router;
        this.threads_error = false;
        this.url = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';
        // url: string = 'http://forumpwa.eu-2.evennode.com';
        // public response:string ;
        this.isDataAvailable = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userLogName = this.currentUser.username + '';
        this.userLogID = this.currentUser.id + '';
        // this.userLogName = routeParams.params;
        // this.route.queryParams.subscribe(params => {
        //   this.userLogName = params["username"];
        // });
    }
    Forum.prototype.ngOnInit = function () {
        // this.getThreads();
        //this.loadThreads()
        // this._callApi('ThreadsList', this.url).then(() =>
        //   this.isDataAvailable = true); // Now has value;
        this._callApi('ThreadsList', this.url);
        this.isDataAvailable = true;
        this.getThreads();
        //this.showResponse();
    };
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
    Forum.prototype.getThreads = function () {
        var _this = this;
        this.http.get("http://127.0.0.2:3001/get_threads")
            .toPromise()
            .then(function (response) {
            // this.getData = response.text();
            // this.getData = JSON.parse(response.text())[0].title;
            _this.myThreads = [];
            var responseJson = JSON.parse(response.text());
            var i = 0;
            for (i = 0; i < responseJson.length; i++) {
                _this.myThreads.push({ id: responseJson[i].id,
                    id_author: responseJson[i].id_author,
                    last_update: responseJson[i].last_update,
                    title: responseJson[i].title,
                    text: responseJson[i].text });
            }
        });
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
        /**********************************************************************************************
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
    */ //////////////////////////////////////////////////////////////////////////////////////////////////////
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
    };
    Forum.prototype.deleteThread = function (id) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('id', id);
        this.http.get("http://127.0.0.2:3001/delete_thread", { search: params })
            .toPromise()
            .then(function (response) {
            _this.response2 = response.text();
            _this.getThreads();
        });
    };
    Forum.prototype.showResponse = function () {
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
    };
    Forum.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    };
    /*
      funkce ulozi vysledek pozadavku get, do promenne response az pote, co se vrati nejaky vysledek.
      ostatni ulohy nasledovane za touto konstrukci se vykonavaji asynchrone
      pokud bych chtel, aby se neco vykonalo az potom, co se naplni response odpovedi, musim to dat
      do dalsiho .than bloku
      return  this.http.get(url).toPromise()
    .then(response => response.text()) ;
    
    */
    Forum.prototype._callApi2 = function (url) {
        //var res = '';
        return this.http.get(url).toPromise()
            .then(function (response) { return response.text(); });
    };
    Forum.prototype.testovaci = function () {
        this.router.navigate(['testovaci']);
    };
    Forum.prototype.detail2 = function () {
        this.router.navigate(['detail2']);
    };
    Forum.prototype.detail = function () {
        this.router.navigate(['detail']);
    };
    // onSelect(id, title, id_author, last_update, text){
    Forum.prototype.onSelect = function (id) {
        // this.selectedThread = thread;
        var myfunc = function () {
        };
        myfunc();
        this.router.navigate(['detail', id]);
        // this.router.navigate(['detail', id, title, id_author, last_update, text]);
        // this.router.navigate(['detail']);
    };
    Forum.prototype.addThread = function () {
        this.router.navigate(['forumNew']);
    };
    Forum.prototype.callAnonymousApi = function () {
        this._callApi('ThreadsList', this.url);
    };
    Forum.prototype.callApi_Json = function () {
        this._callApi('Json', this.url);
    };
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
    Forum.prototype.extractData = function (res) {
        var body = res.json();
        this.response2 = JSON.stringify(res.json());
        return body || {};
    };
    Forum.prototype.getThreads3 = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://127.0.0.2:3001/', '{ "action": "get_threads"}', headers)
            .toPromise()
            .then(this.extractData);
    };
    Forum.prototype._callApi = function (type, url) {
        var _this = this;
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
        }
        if (type === 'get_thread') {
        }
        if (type === 'Json') {
            // For non-protected routes, just use Http
            this.http.get(url)
                .subscribe(function (response) { return _this.response3 = response.json(); }, function (error) { return _this.response3 = error.text(); });
        }
        if (type === 'Anonymous') {
            // For non-protected routes, just use Http
            this.http.get(url)
                .subscribe(function (response) { return _this.response2 = response.text(); }, function (error) { return _this.response2 = error.text(); });
        }
        if (type === 'Secured') {
            // For protected routes, use AuthHttp
            this.authHttp.get(url)
                .subscribe(function (response) { return _this.response2 = response.text(); }, function (error) { return _this.response2 = error.text(); });
        }
    };
    Forum = __decorate([
        core_1.Component({
            selector: 'forum',
            template: template,
            styles: [styles]
        })
    ], Forum);
    return Forum;
}());
exports.Forum = Forum;

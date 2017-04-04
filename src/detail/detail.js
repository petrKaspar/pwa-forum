"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// import { Http } from '@angular/http';
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var styles = require('./detail.css');
var template = require('./detail.html');
var Detail = (function () {
    function Detail(fb, router, http, route) {
        this.router = router;
        this.http = http;
        this.route = route;
        this.title = new forms_1.FormControl('', forms_1.Validators.required); // slouzi pro validaci formulare
        this.message = new forms_1.FormControl('', forms_1.Validators.required);
        this.myForm = fb.group({
            'message': this.message
        }); // slouzi pro validaci formulare
    }
    Detail.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            // this.title = +params['title']; // (+) converts string 'id' to a number
            // this.id_author = +params['id_author']; // (+) converts string 'id' to a number
            // this.last_update = +params['last_update']; // (+) converts string 'id' to a number
            // this.text = +params['text']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
        });
        this.get_thread2();
    };
    // public myThreads: Thread[];   // pole s vlakny se naplni pri inicializaci
    // public threads_error: Boolean = false;
    // response: string;
    // response2: string;
    // response3: string;
    // selectedThread: Thread;
    // url: string = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';
    // // public response:string ;
    // isDataAvailable:boolean = false;
    Detail.prototype.get_thread2 = function () {
        var _this = this;
        this.testtext = '<h1>html...</h1>';
        var params = new http_1.URLSearchParams();
        params.set('id', this.id.toString());
        this.http.get("http://127.0.0.2:3001/get_one_thread", { search: params }) //, { search: params }
            .toPromise()
            .then(function (response) {
            // this.getPromiseData = response.text();
            var responseJson = JSON.parse(response.text());
            _this.title2 = responseJson.title;
            _this.last_update = new Date(responseJson.last_update.valueOf() * 1000).toLocaleString();
            _this.text = responseJson.text;
            params = new http_1.URLSearchParams();
            params.set('id', responseJson.id_author);
            _this.http.get("http://127.0.0.2:3001/get_userByID", { search: params })
                .toPromise()
                .then(function (response2) {
                _this.id_author = JSON.parse(response2.text())[0].user;
            });
        });
        //
        // let query = "q={\"id\": \""+this.id+"\"}";
        // let url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?' + query + '&apiKey=9I-wGKTgFqP8A5IJ6zP_jKl0Phgz5B9r';
        //   this.http.get(url_mongoDB)
        //   .toPromise()
        //   .then(response => {
        //     // this.response2 = response.text();
        //     // console.log('----------------- '+response.text() );
        //
        //     // var aaa = '{[ { "_id" : { "$oid" : "589cd22ac2ef162b33d7a296"} , "id" : "1" , "id_author" : "2" , "last_update" : "1482965255" , "title" : "Lorem ipsum dolor " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd248bd966f2cc1c43eaf"} , "id" : "2" , "id_author" : "1" , "last_update" : "1482965259" , "title" : "Lorem ipsum gaude" , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd264c2ef162b33d7a2d7"} , "id" : "3" , "id_author" : "1" , "last_update" : "1482965321" , "title" : "Consectetur adipiscing " , "text" : "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"} , { "_id" : { "$oid" : "589cd28bbd966f2cc1c43f43"} , "id" : "4" , "id_author" : "1" , "last_update" : "1482965339" , "title" : " Laboris nisi ut" , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd29dbd966f2cc1c43f58"} , "id" : "5" , "id_author" : "3" , "last_update" : "1482965439" , "title" : " Duis aute irure " , "text" : "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"} , { "_id" : { "$oid" : "589cd2c6c2ef162b33d7a528"} , "id" : "6" , "id_author" : "1" , "last_update" : "1482965439" , "title" : "Excepteur sint occaecat " , "text" : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"} , { "_id" : { "$oid" : "589cd2e3bd966f2cc1c4442a"} , "id" : "7" , "id_author" : "2" , "last_update" : "1482965439" , "title" : "Sed ut perspiciatis unde omnis iste" , "text" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"} , { "_id" : { "$oid" : "589cd306bd966f2cc1c44444"} , "id" : "8" , "id_author" : "3" , "last_update" : "1482965589" , "title" : "Nemo enim ipsam voluptatem quia" , "text" : "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"} , { "_id" : { "$oid" : "589cd323bd966f2cc1c4445f"} , "id" : "9" , "id_author" : "4" , "last_update" : "1482965799" , "title" : "Neque porro quisquam est" , "text" : "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"} , { "_id" : { "$oid" : "589cd34cc2ef162b33d7a5a6"} , "id" : "10" , "id_author" : "3" , "last_update" : "1482966099" , "title" : "At vero eos et accusamus et iusto odio dignissimos " , "text" : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd367c2ef162b33d7a5c2"} , "id" : "11" , "id_author" : "1" , "last_update" : "1482966199" , "title" : "Et harum quidem rerum " , "text" : "Et harum quidem rerum facilis est et expedita distinctio, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"} , { "_id" : { "$oid" : "589cd3c6c2ef162b33d7a63a"} , "id" : "14" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3ccc2ef162b33d7a640"} , "id" : "15" , "id_author" : "1" , "last_update" : "1482966389" , "title" : "officia deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd3e4bd966f2cc1c4452c"} , "id" : "16" , "id_author" : "2" , "last_update" : "1482966399" , "title" : "similique sunt in deserunt mollitia animi" , "text" : "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."} , { "_id" : { "$oid" : "589cd384bd966f2cc1c444b1"} , "id" : "12" , "id_author" : "5" , "last_update" : "1482966199" , "title" : "Itaque earum rerum hic tenetur" , "text" : "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"} , { "_id" : { "$oid" : "589cd3aabd966f2cc1c444e4"} , "id" : "13" , "id_author" : "6" , "last_update" : "1482966339" , "title" : "Blanditiis praesentium" , "text" : "dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"} ]}'
        //
        //
        //     let responseJson = JSON.parse(response.text()) ;
        //
        //     this.title2 = responseJson[0].title;
        //     this.id_author = responseJson[0].id_author;
        //     this.last_update = responseJson[0].last_update;
        //     this.text = responseJson[0].text;
        // });
        //-----------------------------------------------------------------------------++++++++++++++++++++++++++++++++++++++++++
        // let i = 0;
        // for (i = 0; i < responseJson.length; i++){
        //   this.myThreads.push(
        //     {id: responseJson[i].id,
        //       id_author: responseJson[i].id_author,
        //       last_update: responseJson[i].last_update,
        //       title: responseJson[i].title,
        //       text: responseJson[i].text} );
        // }
    };
    Detail.prototype.updateThread = function () {
        var _this = this;
        var json = JSON.stringify({
            id: this.id.toString(),
            last_update: (new Date().valueOf() / 1000 | 0).toString(),
            text: this.text + "<br>" + JSON.parse(localStorage.getItem('currentUser')).username + "<br>" +
                "<span class='aaa'>" + this.message.value + '</span>'
        });
        var params = 'data=' + json;
        var header = new http_1.Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        this.http.post("http://127.0.0.2:3001/update_thread", params, { headers: header }) //'data='+JSON.stringify(jj)
            .toPromise()
            .then(function (response) {
            // this.getPromiseData = response.text();
            // this.back();
            var responseJson = JSON.parse(response.text());
            _this.last_update = new Date(responseJson.last_update.valueOf() * 1000).toLocaleString();
            _this.text = responseJson.text;
            _this.back();
            // this.get_thread2();
            //
            // this.ngOnInit();
            // this.reset();
        });
        // this.ngOnInit();
    };
    Detail.prototype.back = function () {
        this.router.navigate(['forumHome']);
    };
    Detail.prototype.reset = function () {
        this.myForm.reset();
        this.myForm.clearValidators();
        // this.message.reset();
    };
    Detail.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    Detail = __decorate([
        core_1.Component({
            selector: 'detail',
            template: template,
            styles: [styles]
        })
    ], Detail);
    return Detail;
}());
exports.Detail = Detail;

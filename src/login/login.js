"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var styles = require('./login.css');
var template = require('./login.html');
var Login = (function () {
    function Login(router, http) {
        this.router = router;
        this.http = http;
    }
    Login.prototype.login = function (event, username, password) {
        var _this = this;
        event.preventDefault();
        var navigationExtras = {
            queryParams: {
                "username": username
            }
        };
        var json = JSON.stringify({
            user: username,
            passw: password
        });
        var params = 'data=' + json;
        var header = new http_1.Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        var id_user;
        this.http.post("http://127.0.0.2:3001/get_one_user", params, { headers: header }) //'data='+JSON.stringify(jj)
            .toPromise()
            .then(function (response) {
            if (response.text().length != 0) {
                id_user = JSON.parse(response.text()).id;
                var user = {
                    id: id_user,
                    username: username,
                };
                localStorage.setItem('currentUser', JSON.stringify(user)); // docasne
                localStorage.setItem('id_token', "123456");
                if (!id_user.isEmpty) {
                    _this.router.navigate(['forumHome']);
                }
            }
        });
        // event.preventDefault();
        // let body = JSON.stringify({ username, password });
        // this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
        //   .subscribe(
        //     response => {
        //       localStorage.setItem('id_token', response.json().id_token);
        //       this.router.navigate(['home']);
        //     },
        //     error => {
        //       alert(error.text());
        //       console.log(error.text());
        //     }
        //   );
    };
    Login.prototype.signup = function (event) {
        event.preventDefault();
        this.router.navigate(['signup']);
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            template: template,
            styles: [styles]
        })
    ], Login);
    return Login;
}());
exports.Login = Login;

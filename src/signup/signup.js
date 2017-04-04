"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var headers_1 = require('../common/headers');
var styles = require('./signup.css');
var template = require('./signup.html');
var Signup = (function () {
    function Signup(router, http) {
        this.router = router;
        this.http = http;
    }
    Signup.prototype.signup = function (event, username, password) {
        var _this = this;
        event.preventDefault();
        var body = JSON.stringify({ username: username, password: password });
        this.http.post('http://localhost:3001/users', body, { headers: headers_1.contentHeaders })
            .subscribe(function (response) {
            localStorage.setItem('id_token', response.json().id_token);
            _this.router.navigate(['home']);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    Signup.prototype.login = function (event) {
        event.preventDefault();
        this.router.navigate(['login']);
    };
    Signup = __decorate([
        core_1.Component({
            selector: 'signup',
            template: template,
            styles: [styles]
        })
    ], Signup);
    return Signup;
}());
exports.Signup = Signup;

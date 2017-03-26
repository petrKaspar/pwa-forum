"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
require('rxjs/add/operator/map');
var http_1 = require('angular2/http');
require('rxjs/Rx');
var HTTPTestService = (function () {
    function HTTPTestService(_http) {
        this._http = _http;
    }
    HTTPTestService.prototype.getUser = function () {
        return this._http.get("http://jsonplaceholder.typicode.com/users/1")
            .map(function (res) { return res.json(); });
    };
    ;
    HTTPTestService.prototype.postJson = function () {
        var json = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        });
        var params = 'data=' + json;
        var header = new http_1.Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post("http://jsonplaceholder.typicode.com/posts", params, {
            headers: header
        })
            .map(function (res) { return res.json(); });
    };
    ;
    HTTPTestService.prototype.getUsersByPromise = function () {
        return this._http.get("http://jsonplaceholder.typicode.com/users")
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    HTTPTestService = __decorate([
        core_1.Injectable()
    ], HTTPTestService);
    return HTTPTestService;
}());
exports.HTTPTestService = HTTPTestService;

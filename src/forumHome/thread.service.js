"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Petr on 29.12.2016.
 */
var core_1 = require('@angular/core');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var ThreadService = (function () {
    // Resolve HTTP using the constructor
    function ThreadService(http) {
        this.http = http;
        // private instance variable to hold base url
        this.url = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';
    }
    ThreadService.prototype.getThreadsFromServer = function () {
        // ...using get request
        return this.http.get(this.url)
            .map(function (res) { return res.json(); });
        //...errors if any
        //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    };
    ThreadService = __decorate([
        core_1.Injectable()
    ], ThreadService);
    return ThreadService;
}());
exports.ThreadService = ThreadService;

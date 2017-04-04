"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var styles = require('./forumNew.css');
var template = require('./forumNew.html');
var ForumNew = (function () {
    function ForumNew(fb, router, http) {
        this.router = router;
        this.http = http;
        this.firstName = new forms_1.FormControl('', forms_1.Validators.required);
        this.title = new forms_1.FormControl('', forms_1.Validators.required);
        this.message = new forms_1.FormControl('', forms_1.Validators.required);
        this.thread = new forms_1.FormControl('', forms_1.Validators.required);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.firstName.setValue(this.currentUser.username+'');
        this.myForm = fb.group({
            // 'firstName': this.firstName,
            'message': this.message,
            'title': this.title
        });
    }
    ForumNew.prototype.onSubmitModelBased = function () {
        console.log('model-based form submitted');
        console.log(this.myForm);
    };
    ForumNew.prototype.reset = function () {
        this.myForm.reset();
        this.myForm.clearValidators();
        // this.message.reset();
    };
    ForumNew.prototype.back = function () {
        this.router.navigate(['forumHome']);
    };
    ForumNew.prototype.addThread = function () {
        var _this = this;
        var json = JSON.stringify({
            id_author: this.currentUser.id,
            last_update: (new Date().valueOf() / 1000 | 0).toString(),
            title: this.myForm.value.title,
            text: this.myForm.value.message
        });
        var params = 'data=' + json;
        var header = new http_1.Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        this.http.post("http://127.0.0.2:3001/add_thread", params, { headers: header }) //'data='+JSON.stringify(jj)
            .toPromise()
            .then(function (response) {
            _this.back();
            //this.getPromiseData = response.text();
        });
    };
    ForumNew = __decorate([
        core_1.Component({
            selector: 'forumNew',
            template: template,
            styles: [styles]
        })
    ], ForumNew);
    return ForumNew;
}());
exports.ForumNew = ForumNew;

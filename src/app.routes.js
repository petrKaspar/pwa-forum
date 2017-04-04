"use strict";
var login_1 = require('./login');
var signup_1 = require('./signup');
var testovaci_1 = require('./testovaci');
var detail2_1 = require('./detail2');
var forumHome_1 = require('./forumHome');
var forumNew_1 = require('./forumNew');
var detail_1 = require('./detail');
// import {HTTPTestComponent} from './HTTPTestComponent';
exports.routes = [
    { path: '', component: login_1.Login },
    { path: 'login', component: login_1.Login },
    { path: 'signup', component: signup_1.Signup },
    { path: 'testovaci', component: testovaci_1.Testovaci },
    { path: 'detail2', component: detail2_1.Detail2 },
    //  canActivate (true/false) zjistuje, zda je platny token prihlaseni (tokenNotExpired);
    // pokud neni nikdo prihlsen, nebo vyprsel token, presmeruje se na stranku 'login'
    //  vse se provadi v './common/auth.guard'
    //{ path: 'home',   component: Home, canActivate: [AuthGuard] },
    //{ path: 'home',   component: Home },
    // { path: 'forumHome',   component: Forum, canActivate: [AuthGuard] },
    { path: 'forumHome', component: forumHome_1.Forum },
    { path: 'detail/:id', component: detail_1.Detail },
    { path: 'forumNew', component: forumNew_1.ForumNew },
    // { path: 'HTTPTestComponent',   component: HTTPTestComponent},
    { path: '**', component: login_1.Login }
];

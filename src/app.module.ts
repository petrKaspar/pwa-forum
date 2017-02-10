import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthGuard } from './common/auth.guard';
import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { Testovaci } from './testovaci';
import { Detail2 } from './detail2';
import { Forum } from './forumHome';
import { ForumNew } from './forumNew';
import { Detail } from './detail';
import { App } from './app';

import { routes } from './app.routes';

@NgModule({
  bootstrap: [App],
  declarations: [
    Home, Login, Signup, Testovaci, Detail2, Forum, ForumNew, Detail, App
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    AuthGuard, ...AUTH_PROVIDERS
  ]
})
export class AppModule {}

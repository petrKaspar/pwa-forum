import { Routes } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { AuthGuard } from './common/auth.guard';
import {Testovaci} from './testovaci';
import {Detail2} from './detail2';
import {Forum} from './forumHome';
import {ForumNew} from './forumNew';
import {Detail} from './detail';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'testovaci', component: Testovaci },
  { path: 'detail2', component: Detail2 },
  //  canActivate (true/false) zjistuje, zda je platny token prihlaseni (tokenNotExpired);
  // pokud neni nikdo prihlsen, nebo vyprsel token, presmeruje se na stranku 'login'
  //  vse se provadi v './common/auth.guard'
  //{ path: 'home',   component: Home, canActivate: [AuthGuard] },
  //{ path: 'home',   component: Home },

  // { path: 'forumHome',   component: Forum, canActivate: [AuthGuard] },
  { path: 'forumHome',   component: Forum},
  { path: 'detail/:id',   component: Detail},
  { path: 'forumNew',   component: ForumNew},
  { path: '**',     component: Login }
];

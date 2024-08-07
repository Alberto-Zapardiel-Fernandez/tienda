import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'update', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'client', component: ClientComponent },
];

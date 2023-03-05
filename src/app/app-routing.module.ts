import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: '',
  redirectTo: 'auth', 
  pathMatch: 'full' },
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
},
{
  path: 'users',
  loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

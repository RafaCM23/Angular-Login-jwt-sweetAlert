import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'users',canActivateChild:[AuthGuard], component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent },] 
  },

    { path: 'servers', canActivateChild:[AuthGuard], component: ServersComponent, children: [
      { path: ':id/edit', component: EditServerComponent, 
      canDeactivate: [CanDeactivateGuard], 
      resolve: {server: ServerResolver} 
    }, 
      { path: ':id', component: ServerComponent }]},



  { path: 'not-found', component: ErrorPageComponent,  data: {message: 'Ooops! Page not found.'}},
  { path: '**', redirectTo: '/not-found'}
  
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//esta clase es necesaria para poder getsionar las rutas desde el app.module.ts al principio
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgNotFoundComponent } from './components/pg-not-found/pg-not-found.component';

const routes: Routes = [
    { path: '', loadChildren: () => import('./components/Lazy/auth/modules/auth.module').then(m => m.AuthModule) },
    { path: 'user', loadChildren: () => import('./components/Lazy/users/modules/users.module').then(m => m.UsersModule) },
    { path:"404",component:PgNotFoundComponent},
    { path:"**",redirectTo:"/404",pathMatch:"full"}
];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

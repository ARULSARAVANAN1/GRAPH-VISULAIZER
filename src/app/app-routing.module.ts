import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgNotFoundComponent } from './components/pg-not-found/pg-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { signupGuardGuard } from './shared/guard/signup-guard.guard';
import { UserComponent } from './components/user/user.component';
import { FileDialogComponent } from './components/file-dialog/file-dialog.component';

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterationComponent},
    {path:'user',component:UserComponent},
    {path:'file',component:FileDialogComponent},
    { path:"404",component:PgNotFoundComponent},
    { path:"**",redirectTo:"/404",pathMatch:"full"}
];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterationComponent } from '../components/registeration/registeration.component';
import { PgNotFoundComponent } from '../../../pg-not-found/pg-not-found.component';
import { signupGuardGuard } from 'src/app/shared/guard/signup-guard.guard';
import { SignupComponent } from '../components/signup/signup.component';

const routes: Routes = [{ path: '', component: AuthComponent, 
children: 
  [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterationComponent,canActivate:[signupGuardGuard]},
    {path:"signup",component:SignupComponent, canActivate:[signupGuardGuard]},
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

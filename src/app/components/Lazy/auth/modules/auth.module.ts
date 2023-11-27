import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from '../auth.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { RegisterationComponent } from '../components/registeration/registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogcompComponent } from '../components/dialogcomp/dialogcomp.component';
import { AngularmaterialModule } from 'src/app/modules/angularmaterial.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    RegisterationComponent,
    DialogcompComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AngularmaterialModule
  ],
})
export class AuthModule { }

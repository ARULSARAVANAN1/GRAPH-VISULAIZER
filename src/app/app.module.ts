import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthserviceService } from './shared/service/authservice.service';
import { InterceptorsInterceptor } from './shared/interceptors/interceptors.interceptor';
import { PgNotFoundComponent } from './components/pg-not-found/pg-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { DialogcompComponent } from './components/dialogcomp/dialogcomp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialModule } from './modules/angularmaterial.module';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileDialogComponent } from './components/file-dialog/file-dialog.component';

@NgModule({
  declarations: [AppComponent,
                 LoginComponent,
                 RegisterationComponent,
                 DialogcompComponent,
                 PgNotFoundComponent,
                 UserComponent,
                 NavbarComponent,
                 DashboardComponent,
                 FileDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireDatabaseModule,

  ],
  providers: [
    AuthserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

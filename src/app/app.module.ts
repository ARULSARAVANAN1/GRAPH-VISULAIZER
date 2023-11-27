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
import { BookserviceService } from './shared/service/bookservice.service';
import { CartserviceService } from './shared/service/cartservice.service';
import { InterceptorsInterceptor } from './shared/interceptors/interceptors.interceptor';
import { PgNotFoundComponent } from './components/pg-not-found/pg-not-found.component';

@NgModule({
  declarations: [AppComponent, PgNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthserviceService,
    BookserviceService,
    CartserviceService,
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

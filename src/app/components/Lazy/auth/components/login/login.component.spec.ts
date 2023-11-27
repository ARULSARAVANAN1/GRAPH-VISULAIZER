import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogcompComponent } from '../dialogcomp/dialogcomp.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthserviceService;
  let toastrService: ToastrService;
  let matDialog:MatDialog;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[ToastrModule.forRoot(),
              AngularFireModule.initializeApp(environment.firebase),
              HttpClientTestingModule,
              ReactiveFormsModule,
              MatDialogModule
            ],
      providers:[AuthserviceService,
                 ToastrService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthserviceService);
    toastrService = TestBed.inject(ToastrService);
    matDialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  
  it('should create Login Component', () => {
    expect(component).toBeTruthy();
  });

  it('Checking the form  initialization and with default values', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.getRawValue().email).toEqual('');
    expect(component.loginForm.getRawValue().password).toEqual('');
  });

  it('Checking the login method in service is called or not when submit method is called', () => {
    spyOn(authService, 'login');
    component.loginForm.setValue({
      email: 'arul@gmail.com',
      password: 'Arul@1999',
    });
    component.submit();
    expect(authService.login).toHaveBeenCalledWith(
      'arul@gmail.com',
      'Arul@1999'
    );
  });

  it('Checking open dialog when resetPassword() is called', () => {
    const dialogOpenSpy = spyOn(matDialog, 'open');
    component.resetPassword();
    expect(dialogOpenSpy).toHaveBeenCalledWith(DialogcompComponent);
  });

});

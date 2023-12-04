import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';

@Component({
  selector: 'app-dialogcomp',
  templateUrl: './dialogcomp.component.html',
  styleUrls: ['./dialogcomp.component.css']
})
export class DialogcompComponent{

  constructor(private matDialog:MatDialog,
              private toastr: ToastrService,
              private auth: AuthserviceService)
              {}
              
  email:string = '';
  
  onNoClick()
  {
    this.matDialog.closeAll();
  }

  getPasswordLink()
  {
    if(this.email != '')
    {
      this.auth.resetPassword(this.email);
      this.toastr.success('Check your email For Reset Link');
      this.matDialog.closeAll();
    }
    else {
      this.toastr.error('Please enter email', 'User Info');
    }
    
  }
}

import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class customvalidator {

  static passwordPattern(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // console.log(value);
  
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/.test(value) && value)  
    {
        // console.log("error");
        return { invalidPasswordPattern: true };
    }
    // console.log("fine");
    return null;
  }

  static usernameValidator(control: FormControl): ValidationErrors | null {
    const username = control.value;
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernamePattern.test(username) && username) {
      // console.log("error");
      return { invalidUsername: true };
    }

    // console.log("fine");
    return null;
  }

  static mobileNumberValidator(control: FormControl): ValidationErrors | null {
    const mobile = control.value;
    // console.log(mobile.length);

    const pattern = /^\d{10}$/;
    if (!pattern.test(mobile) && mobile) {
      // console.log("error");
      return { invalidMobileNumber: true };
    }
      // console.log("fine");
    return null;
  }

  static confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => 
  {
    // console.log(control.value)
    return control.value.password === control.value.cpassword ? null : {PasswordNoMatch: true};
  };
  

}





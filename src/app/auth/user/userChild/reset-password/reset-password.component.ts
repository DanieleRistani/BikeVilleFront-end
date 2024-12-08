import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { UserService } from '../../../../service/auth/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

constructor(private formBuilder: FormBuilder,private userService: UserService,private route: ActivatedRoute,private notify: ToastrService) {}

  id!: number
  showPassword: boolean = false 
  resetPassForm!: FormGroup;
  ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     console.log(this.id);
     
     this.resetPassForm = this.formBuilder.group(
       {
         oldPassword: new FormControl(null, [Validators.required]) ,
         newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
         confermedPassword: new FormControl(null, [Validators.required]),
       },{ validators:this.passwordsMatch}
     );
   }

   passwordsMatch(controls: FormGroup): ValidationErrors | null {
    const password = controls.get('newPassword')?.value;
    const confermedPassword = controls.get('confermedPassword')?.value;
    if (password !== confermedPassword) {
      controls.get('confermedPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
  

  submitUpdatePass() {
    this.oldPasswordMatch(this.resetPassForm);
  }
  oldPasswordMatch(controls: FormGroup) {
    const password = controls.get('oldPassword')?.value;
 
    this.userService.checkPassword(password,this.id).subscribe((data: any) => {
      if (data) {
        this.changePassword();
      }else{
       this.notify.error('Password attuale errata') 

      }
    });
     
  }

  changePassword() {
     this.userService.updatePassword(this.resetPassForm.value.newPassword,this.id).subscribe((data: any) => {
      console.log(data);
      this.notify.success('Password cambiata con successo')
      setTimeout(() => {
        window.location.replace("/");
      },1000)
     })
   
  };

}

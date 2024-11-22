import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from '../../service/auth/register.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor, NgIf,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }
  registerForm!: FormGroup
  
  showPassword: boolean = false;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: new FormControl(null),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      middleName: new FormControl(null),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      suffix: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl(null, [Validators.required]),

    }, { validators: this.passwordsMatch })

  }

  passwordsMatch(controls: FormGroup): ValidationErrors | null {
    const password = controls.get('password')?.value;
    const confirmedPassword = controls.get('confirmedPassword')?.value;
    if (password !== confirmedPassword) {
      controls.get('confirmedPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  addUser() {

    if (this.registerForm.valid) {

      this.registerService.register({
        Title: this.registerForm.value.title,
        FirstName: this.registerForm.value.firstName,
        MiddleName: this.registerForm.value.middleName,
        LastName: this.registerForm.value.lastName,
        Suffix: this.registerForm.value.suffix,
        EmailAddress: this.registerForm.value.email,
        Phone: this.registerService.formattaNumero(this.registerForm.value.phone.toString()),
        Password: this.registerForm.value.password,
        Role: "USER",
      }).subscribe((data: any) => {
        console.log(data);
      })
    } else {
      console.log("Invalid Form", this.registerForm.value);
      
    }
  }
}

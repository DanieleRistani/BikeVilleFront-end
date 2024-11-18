import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  
  registerForm!:FormGroup
  
  matchPassword(controls: AbstractControl): ValidationErrors | null {
    const password = controls.get('password')?.value;
    const confirmPassword = controls.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return {mismatch: true};
    }
    return null;
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      title: new FormControl(null),
      firstName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      middleName: new FormControl(null),
      lastName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      suffix: new FormControl(null),
      email: new FormControl(null,[Validators.required,Validators.email]),
      phone: new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      confirmedPassword: new FormControl(null,[Validators.required,this.matchPassword.bind(this)]),

    })
  }
}

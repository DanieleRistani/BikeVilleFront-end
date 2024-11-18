import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIf,NgFor } from '@angular/common';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgFor,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  constructor(private formBuilder: FormBuilder) { }
  registerForm!:FormGroup
  

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: new FormControl(null),
      firstName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      middleName: new FormControl(null),
      lastName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      suffix: new FormControl(null),
      email: new FormControl(null,[Validators.required,Validators.email]),
      phone: new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      confirmedPassword: new FormControl(null,[Validators.required]),

    },{validators: this.passwordsMatch})
    
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
}

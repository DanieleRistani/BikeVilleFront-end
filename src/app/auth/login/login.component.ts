import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/auth/login.service';
import {  HttpStatusCode } from '@angular/common/http';
import { Credentials } from '../../Entity/Credentials';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,private formBuilder: FormBuilder,private router: Router,private notify: ToastrService) {
    
  }


credentials!: Credentials
showPassword: boolean = false

loginForm!: FormGroup
jwtToken!: string


ngOnInit(): void {
  
  this.loginForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
     
  })
}


runLogin() {
  this.credentials = new Credentials(this.loginForm.value.email, this.loginForm.value.password);

  this.loginService.loginPost(this.credentials).subscribe({
    next: (response: any) => {
      if (response.status === HttpStatusCode.Ok) {
        console.log('Login effettuato');
        this.jwtToken = response.body.token;
        this.setTokenLocalStorage(response.body.token);
        this.setCartLocalStorage();
        this.notify.success('Login effettuato con successo');
        setTimeout(() => {
          window.location.replace('/');
        }, 1000);
      } else if (response.status === HttpStatusCode.NoContent) {
        this.notify.error('Credenziali assenti');
      }
    },
    error: (error) => {
      this.notify.error('Errore nel processo di login,credenziali errate');
    },
  });

  this.loginForm.reset();
}



setTokenLocalStorage( token : string){
  localStorage.setItem('token',token); 
}
setCartLocalStorage(){
  localStorage.setItem('cart',JSON.stringify([]));
}

}
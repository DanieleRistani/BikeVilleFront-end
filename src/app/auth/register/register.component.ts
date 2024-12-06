import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from '../../service/auth/register.service';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../Entity/Credentials';
import { LoginService } from '../../service/auth/login.service';
import { MailService } from '../../service/mail/mail.service';
import { RequestEmail } from '../../Entity/RequestEmail';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor, NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private loginService: LoginService,
    private mailService: MailService,
    private notify: ToastrService
  ) {}
  registerForm!: FormGroup;
  showPassword: boolean = false;
  emailRequest!: RequestEmail;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        title: new FormControl(null),
        firstName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
        middleName: new FormControl(null),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
        suffix: new FormControl(null),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmedPassword: new FormControl(null, [Validators.required]),
      },
      { validators: this.passwordsMatch }
    );
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
      this.registerService
        .register({
          Title: this.registerForm.value.title,
          FirstName: this.registerForm.value.firstName,
          MiddleName: this.registerForm.value.middleName,
          LastName: this.registerForm.value.lastName,
          Suffix: this.registerForm.value.suffix,
          EmailAddress: this.registerForm.value.email,
          Phone: this.registerService.formattaNumero(
            this.registerForm.value.phone.toString()
          ),
          Password: this.registerForm.value.password,
          Role: 'USER',
        })
        .subscribe((data: any) => {
          console.log(data);
          this.notify.success('Registrazione effettuata con successo');
          this.emailRequest = {
            toEmail: this.registerForm.value.email,
            subject: 'Conferma successo Registrazione',
            message: `<!DOCTYPE html>
    <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Conferma Registrazione</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background-color: #f57500; /* Arancione */
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                    color: #333;
                }
                .button {
                    display: inline-block;
                    margin: 20px 0;
                    padding: 12px 20px;
                    background-color: #f57500; /* Arancione */
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .footer {
                    background-color: #f1f1f1;
                    color: #777;
                    text-align: center;
                    padding: 10px 20px;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Benvenuto/a!</h1>
                </div>
                <div class="content">
                    <p>Ciao <strong>${this.registerForm.value.email}</strong>,</p>
                    <p>Grazie per esserti registrato/a al nostro servizio.</p> 
                    <p>Se non hai richiesto questa registrazione, puoi ignorare questa email.</p>
                    <p>Grazie,</p>
                    <p>Il Team BikeVille</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 BikeVille. Tutti i diritti riservati.</p>
                </div>
            </div>
        </body>
    </html>
     `,
          };

          this.mailService.sendSuccessRegisterEmail(this.emailRequest).subscribe();
        });
    } else {
      this.notify.error('Registrazione fallita');
    }
    setTimeout(() => {
      window.location.replace('/login');
    }, 1000);
   
    
  }
}

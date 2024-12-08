import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/auth/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MailService } from '../../service/mail/mail.service';
import { RequestEmail } from '../../Entity/RequestEmail';
import { RouterLink,RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private loginService :LoginService,private route:ActivatedRoute,private emailService: MailService) { }
  authUser : any
  jwtDecode :any
  emailRequest!: RequestEmail
  ngOnInit(): void {
    this.jwtDecode=jwtDecode(localStorage.getItem('token')!)
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(this.jwtDecode.unique_name != params.get('email')){
        this.loginService.runLogout()
      }else{
        this.loginService.getAuthUser(params.get('email')!).subscribe((data: any) => {
          this.authUser=data
        });
      }
    }); 
   
    
  }

  sendRecoverPasswordEmail() {
    this.emailRequest = {
      toEmail: this.authUser.emailAddress,
      subject: 'Recupero password',
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
              <p>Ciao <strong>${this.authUser.emailAddress}</strong>,</p>
              <p>questa è la tua ${this.authUser.passwordHash}</p> 
              <p>Se non hai richiesto tu il rcupero della password contatta il team BikeVille.</p>
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
    this.emailService.sendRecoverPasswordEmail(this.emailRequest).subscribe();
  }


}

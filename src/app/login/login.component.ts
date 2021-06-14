import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  _response: any;

  get response() {
    return this.auth.registrationResponse;
  }

  constructor(private auth: AuthenticationService, public router: Router) {}

  formAction() {
    console.log('usename = ', this.username);
    console.log('password = ', this.password);
    let request = {
      username: this.username,
      password: this.password,
    };
    this.auth.login(request);
  }

  ngOnInit(): void {}
}

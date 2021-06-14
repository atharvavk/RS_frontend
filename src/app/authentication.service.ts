import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  registrationResponse: any;
  session: any;

  async isLoggedIn() {
    if (this.session == undefined || !this.session.success) {
      await this.getSession();
    }
    return this.session.success;
  }

  async getSession() {
    await this.http
      .get('/api/login/session')
      .toPromise()
      .then((data) => {
        this.session = data;
      });
  }

  login(request: any) {
    this.http.post('/api/login', request).subscribe((data) => {
      this.registrationResponse = data;
      if (this.registrationResponse.success) {
        this.router.navigate(['/storage']);
      }
    });
  }

  register(request: any) {
    this.http.post('/api/register', request).subscribe((data) => {
      this.registrationResponse = data;
    });
    // return retval;
  }
  constructor(private http: HttpClient, private router: Router) {
    this.registrationResponse = { message: '', success: false };
  }
}

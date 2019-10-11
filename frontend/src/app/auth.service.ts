import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<boolean>('/api/login', formData). pipe(map(
      (res) => this.isLoggedIn = res,
      (err) => console.log(err)
    ));
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

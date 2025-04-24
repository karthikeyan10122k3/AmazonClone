import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:8080/api/auth';
  private SIGNUP_URL = `${this.BASE_URL}/register`;
  private LOGIN_URL = `${this.BASE_URL}/login`;

  constructor(private http: HttpClient) {}

  // Sign Up
  signUp(formValues: any): Observable<User> {
    return this.http.post<User>(this.SIGNUP_URL, formValues)
  }

  // Login
  login(contact: string, password: string): Observable<User> {
    
    return this.http.post<User>(this.LOGIN_URL, { contact, password }).pipe(
      tap(user => this.setUser(user))
    );
  }

  private setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    const storedData = localStorage.getItem('user');
    if (!storedData) {
      return null;
    }
    const parsedData = JSON.parse(storedData);
    const { token } = parsedData;
    return token
  }
  
  getUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
    const storedData = localStorage.getItem('user');
    if (!storedData) {
      return null;
    }
    const parsedData = JSON.parse(storedData);
    const {user} = parsedData;
    return user

    }
  }


  logout() {
    localStorage.removeItem('user');
  }
}

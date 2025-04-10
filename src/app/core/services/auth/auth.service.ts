import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'https://your-backend-url.com/users'; // Replace this with your actual base URL
  private SIGNUP_URL = `${this.BASE_URL}/register`;
  private LOGIN_URL = `${this.BASE_URL}/login`;

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Sign Up
  signUp(formValues: any): Observable<User> {
    const newUser: User = {
      fullName: formValues.fullName,
      email: formValues.contact.includes('@') ? formValues.contact : '',
      mobile: !formValues.contact.includes('@') ? formValues.contact : '',
      password: formValues.password,
      cart: [],
      orders: []
    };

    return this.http.post<User>(this.SIGNUP_URL, newUser).pipe(
      tap(user => this.setUser(user))
    );
  }

  // Login
  login(contact: string, password: string): Observable<User> {
    return this.http.post<User>(this.LOGIN_URL, { contact, password }).pipe(
      tap(user => this.setUser(user))
    );
  }

  private setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getUserFromStorage(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}

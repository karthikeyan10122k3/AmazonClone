import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpUrl = 'add your signup api da venky'; 
  private loginUrl = 'add your login api da venky'; 

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

    return this.http.post<User>(this.signUpUrl, newUser).pipe(
      tap(user => this.setUser(user))
    );
  }

  // Login
  login(contact: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, { contact, password }).pipe(
      tap(user => this.setUser(user))
    );
  }

  // Storing user in local storage 
  private setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Getting user from local storage
  private getUserFromStorage(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }
  
  // Getting the current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // updating the users Behaviour subject
  public setCurrentUser(user: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}

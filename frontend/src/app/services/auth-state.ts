import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private userSubject: BehaviorSubject<User | null>;
  private tokenSubject: BehaviorSubject<string | null>;

  user$: Observable<User | null>;
  token$: Observable<string | null>;

  constructor() {
    const user = this.getUserFromLocalStorage();
    const token = this.getTokenFromLocalStorage();

    this.userSubject = new BehaviorSubject<User | null>(user);
    this.tokenSubject = new BehaviorSubject<string | null>(token);

    this.user$ = this.userSubject.asObservable();
    this.token$ = this.tokenSubject.asObservable();
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  init() {
    const user = this.getUserFromLocalStorage();
    const token = this.getTokenFromLocalStorage();

    this.userSubject = new BehaviorSubject<User | null>(user);
    this.tokenSubject = new BehaviorSubject<string | null>(token);

    this.user$ = this.userSubject.asObservable();
    this.token$ = this.tokenSubject.asObservable();
  }

  private getUserFromLocalStorage(): User | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private getTokenFromLocalStorage(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  setAuth(user: User, token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
    this.userSubject.next(user);
    this.tokenSubject.next(token);
  }

  clearAuth() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.userSubject.next(null);
    this.tokenSubject.next(null);
  }
}

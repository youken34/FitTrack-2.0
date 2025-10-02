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
  private userSubject!: BehaviorSubject<User | null>;
  private tokenSubject!: BehaviorSubject<string | null>;

  user$!: Observable<User | null>;
  token$!: Observable<string | null>;

  constructor() {}

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  setAuth(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.userSubject.next(user);
    this.tokenSubject.next(token);
  }

  // Déconnexion
  clearAuth() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.tokenSubject.next(null);
  }

  private getUserFromLocalStorage(): User | null {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  init() {
    const user = this.getUserFromLocalStorage();
    const token = this.getTokenFromLocalStorage();

    this.userSubject = new BehaviorSubject<User | null>(user);
    this.tokenSubject = new BehaviorSubject<string | null>(token);

    this.user$ = this.userSubject.asObservable();
    this.token$ = this.tokenSubject.asObservable();
  }
}

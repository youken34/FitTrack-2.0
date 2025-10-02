// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from './services/auth-state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authState: AuthStateService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authState.token;
    if (!token) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}

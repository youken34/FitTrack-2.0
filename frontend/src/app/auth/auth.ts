import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class AuthComponent implements OnInit {
  activeTab: 'login' | 'register' = 'login';
  showPassword = false;
  isLoading = false;
  showSuccess = false;
  successMessage = '';

  loginForm: LoginForm = {
    email: '',
    password: '',
    remember: false,
  };

  registerForm: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  get passwordsMatch(): boolean {
    if (!this.registerForm.confirmPassword) return true;
    return this.registerForm.password === this.registerForm.confirmPassword;
  }

  get passwordStrength(): number {
    const password = this.registerForm.password;
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  }

  get passwordStrengthText(): string {
    const texts = ['Très faible', 'Faible', 'Moyenne', 'Bonne', 'Excellente'];
    return texts[this.passwordStrength] || 'Très faible';
  }

  get isRegisterFormValid(): boolean {
    return this.passwordsMatch && this.registerForm.acceptTerms;
  }

  handleLogin(): void {
    this.isLoading = true;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post(
        'http://localhost:5000/api/users/login',
        {
          email: this.loginForm.email,
          password: this.loginForm.password,
        },
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          console.log('✅ Connecté:', data);

          // Stocker token et user dans localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.showSuccessMessage('Connexion réussie !');

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (error) => {
          console.error('❌ Erreur de connexion:', error);
          this.showSuccessMessage('Erreur de connexion. Vérifiez vos identifiants.');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  handleRegister(): void {
    if (!this.isRegisterFormValid) return;

    this.isLoading = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    this.http
      .post(
        'http://localhost:3000/users/register',
        {
          firstName: this.registerForm.firstName,
          lastName: this.registerForm.lastName,
          email: this.registerForm.email,
          password: this.registerForm.password,
        },
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          console.log('✅ Inscrit:', data);

          // Stocker token et user dans localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.showSuccessMessage('Compte créé avec succès ! Vérifiez votre email.');

          setTimeout(() => {
            this.resetRegisterForm();
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          console.error("❌ Erreur d'inscription:", error);
          this.showSuccessMessage("Erreur lors de l'inscription.");
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  socialLogin(provider: string): void {
    console.log(`Connexion avec ${provider}`);
    this.showSuccessMessage(`Connexion ${provider} en cours...`);
  }

  resetRegisterForm(): void {
    this.registerForm = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    };
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccess = true;

    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  setActiveTab(tab: 'login' | 'register'): void {
    this.activeTab = tab;
    this.showPassword = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

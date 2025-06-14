import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../../core/services/auth.service';
import { SignupRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <div class="auth-card-wrapper">
        <mat-card class="auth-card fade-in">
          <mat-card-header class="auth-header">
            <div class="auth-logo">
              <mat-icon class="logo-icon">computer</mat-icon>
              <h1>ITSupport</h1>
            </div>
            <p class="auth-subtitle">Créez votre compte</p>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Nom d'utilisateur</mat-label>
                <input matInput formControlName="username" required>
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                  Le nom d'utilisateur est requis
                </mat-error>
                <mat-error *ngIf="registerForm.get('username')?.hasError('minlength')">
                  Le nom d'utilisateur doit contenir au moins 3 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" required>
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  L'email est requis
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  L'email n'est pas valide
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Mot de passe</mat-label>
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                  Le mot de passe est requis
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                  Le mot de passe doit contenir au moins 6 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Rôle</mat-label>
                <mat-select formControlName="role" required>
                  <mat-option value="user">Utilisateur</mat-option>
                  <mat-option value="technicien">Technicien</mat-option>
                  <mat-option value="admin">Administrateur</mat-option>
                </mat-select>
                <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                  Le rôle est requis
                </mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="registerForm.invalid || isLoading" class="submit-button">
                <span *ngIf="!isLoading">S'inscrire</span>
                <span *ngIf="isLoading">Inscription...</span>
              </button>
            </form>
          </mat-card-content>

          <mat-card-actions class="auth-actions">
            <p class="auth-link-text">
              Déjà un compte ? 
              <a routerLink="/auth/login" class="auth-link">Se connecter</a>
            </p>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
    }

    .auth-card-wrapper {
      width: 100%;
      max-width: 400px;
    }

    .auth-card {
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .logo-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #667eea;
    }

    .auth-logo h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
    }

    .auth-subtitle {
      color: #64748b;
      margin: 0;
      font-size: 1rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-field {
      width: 100%;
    }

    .submit-button {
      width: 100%;
      height: 48px;
      font-size: 1rem;
      font-weight: 500;
      margin-top: 1rem;
    }

    .auth-actions {
      text-align: center;
      padding-top: 1rem;
    }

    .auth-link-text {
      margin: 0;
      color: #64748b;
    }

    .auth-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .auth-link:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formValue = this.registerForm.value;
      
      const userData: SignupRequest = {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        roles: [formValue.role]
      };

      this.authService.register(userData).subscribe({
        next: () => {
          this.snackBar.open('Inscription réussie !', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Erreur lors de l\'inscription. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
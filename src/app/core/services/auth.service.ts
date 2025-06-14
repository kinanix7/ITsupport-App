import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { User, LoginRequest, SignupRequest, AuthResponse, Role } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl + '/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/signin`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.loadUserFromToken(response.token);
        })
      );
  }

  register(userData: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/signup`, userData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.loadUserFromToken(response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  hasRole(role: Role): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles?.includes(role) || false;
  }

  isAdmin(): boolean {
    return this.hasRole(Role.ROLE_ADMIN);
  }

  isTechnicien(): boolean {
    return this.hasRole(Role.ROLE_TECHNICIEN);
  }

  isUser(): boolean {
    return this.hasRole(Role.ROLE_USER);
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    if (token && this.isAuthenticated()) {
      this.loadUserFromToken(token);
    }
  }

  private loadUserFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user: User = {
        id: payload.id,
        username: payload.sub,
        email: payload.email,
        roles: payload.roles || []
      };
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error parsing token:', error);
      this.logout();
    }
  }
}
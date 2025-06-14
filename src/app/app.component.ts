import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { filter } from 'rxjs/operators';

import { AuthService } from './core/services/auth.service';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    SidenavComponent
  ],
  template: `
    <div class="app-container">
      <mat-toolbar class="app-toolbar" *ngIf="!isAuthPage">
        <button mat-icon-button (click)="toggleSidenav()" class="menu-button">
          <mat-icon>menu</mat-icon>
        </button>
        
        <span class="app-title">ITSupport</span>
        
        <span class="spacer"></span>
        
        <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-button">
          <mat-icon>account_circle</mat-icon>
          <span class="hide-mobile">{{ currentUser?.username }}</span>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
        
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>Déconnexion</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <div class="app-content" [class.with-toolbar]="!isAuthPage">
        <app-sidenav 
          *ngIf="!isAuthPage" 
          [isOpen]="sidenavOpen"
          (toggleSidenav)="toggleSidenav()">
        </app-sidenav>
        
        <main class="main-content" [class.with-sidenav]="!isAuthPage">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-toolbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .app-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-left: 1rem;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-menu-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
    }

    .menu-button {
      color: white;
    }

    .app-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .app-content.with-toolbar {
      height: calc(100vh - 64px);
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background-color: #f8fafc;
    }

    .main-content.with-sidenav {
      margin-left: 0;
      transition: margin-left 0.3s ease;
    }

    @media (min-width: 768px) {
      .main-content.with-sidenav {
        margin-left: 280px;
      }
    }

    @media (max-width: 767px) {
      .hide-mobile {
        display: none;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'ITSupport';
  isAuthPage = false;
  sidenavOpen = false;
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check if current route is auth page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAuthPage = event.url.includes('/auth');
    });

    // Get current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav 
      [opened]="isOpen" 
      [mode]="sidenavMode" 
      class="sidenav"
      (closedStart)="onSidenavClose()">
      
      <div class="sidenav-header">
        <div class="logo">
          <mat-icon class="logo-icon">computer</mat-icon>
          <span class="logo-text">ITSupport</span>
        </div>
        <button mat-icon-button (click)="closeSidenav()" class="close-button show-mobile">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-nav-list class="nav-list">
        <a mat-list-item routerLink="/dashboard" routerLinkActive="active" (click)="onMobileNavClick()">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Tableau de bord</span>
        </a>

        <div *ngIf="authService.isAdmin()">
          <a mat-list-item routerLink="/equipements" routerLinkActive="active" (click)="onMobileNavClick()">
            <mat-icon matListItemIcon>devices</mat-icon>
            <span matListItemTitle>Équipements</span>
          </a>

          <a mat-list-item routerLink="/pannes" routerLinkActive="active" (click)="onMobileNavClick()">
            <mat-icon matListItemIcon>build</mat-icon>
            <span matListItemTitle>Pannes</span>
          </a>
        </div>

        <a mat-list-item routerLink="/tickets" routerLinkActive="active" (click)="onMobileNavClick()">
          <mat-icon matListItemIcon>support</mat-icon>
          <span matListItemTitle>Tickets</span>
        </a>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [`
    .sidenav {
      width: 280px;
      background: white;
      border-right: 1px solid #e2e8f0;
    }

    .sidenav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .close-button {
      color: white;
    }

    .nav-list {
      padding-top: 1rem;
    }

    .nav-list a {
      margin: 0.25rem 1rem;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .nav-list a:hover {
      background-color: #f1f5f9;
    }

    .nav-list a.active {
      background-color: #e0e7ff;
      color: #3730a3;
    }

    .nav-list a.active mat-icon {
      color: #3730a3;
    }

    @media (max-width: 767px) {
      .sidenav {
        width: 100vw;
        max-width: 320px;
      }
      
      .show-mobile {
        display: block !important;
      }
    }

    @media (min-width: 768px) {
      .show-mobile {
        display: none !important;
      }
    }
  `]
})
export class SidenavComponent {
  @Input() isOpen = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(public authService: AuthService) {}

  get sidenavMode() {
    return window.innerWidth > 768 ? 'side' : 'over';
  }

  closeSidenav() {
    this.toggleSidenav.emit();
  }

  onSidenavClose() {
    if (window.innerWidth <= 768) {
      this.toggleSidenav.emit();
    }
  }

  onMobileNavClick() {
    if (window.innerWidth <= 768) {
      this.closeSidenav();
    }
  }
}
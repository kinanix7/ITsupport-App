import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { EquipementService } from '../../core/services/equipement.service';
import { TicketService } from '../../core/services/ticket.service';
import { PanneService } from '../../core/services/panne.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Tableau de bord</h1>
        <p class="dashboard-subtitle">
          Bienvenue, {{ currentUser?.username }}
        </p>
      </div>

      <div class="stats-grid">
        <mat-card class="stat-card fade-in" *ngIf="authService.isAdmin()">
          <mat-card-content class="stat-content">
            <div class="stat-icon-wrapper equipements">
              <mat-icon class="stat-icon">devices</mat-icon>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ equipementsCount }}</h3>
              <p class="stat-label">Équipements</p>
            </div>
          </mat-card-content>
          <mat-card-actions class="stat-actions">
            <button mat-button routerLink="/equipements" color="primary">
              Gérer
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="stat-card fade-in" *ngIf="authService.isAdmin()">
          <mat-card-content class="stat-content">
            <div class="stat-icon-wrapper pannes">
              <mat-icon class="stat-icon">build</mat-icon>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ pannesCount }}</h3>
              <p class="stat-label">Pannes</p>
            </div>
          </mat-card-content>
          <mat-card-actions class="stat-actions">
            <button mat-button routerLink="/pannes" color="primary">
              Voir
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="stat-card fade-in">
          <mat-card-content class="stat-content">
            <div class="stat-icon-wrapper tickets">
              <mat-icon class="stat-icon">support</mat-icon>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ ticketsCount }}</h3>
              <p class="stat-label">
                {{ authService.isAdmin() ? 'Tickets' : 
                   authService.isTechnicien() ? 'Mes tickets' : 'Mes tickets' }}
              </p>
            </div>
          </mat-card-content>
          <mat-card-actions class="stat-actions">
            <button mat-button routerLink="/tickets" color="primary">
              Gérer
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div class="quick-actions" *ngIf="!authService.isAdmin()">
        <mat-card class="action-card fade-in">
          <mat-card-header>
            <mat-card-title>Actions rapides</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="action-buttons">
              <button mat-raised-button color="primary" routerLink="/tickets/create">
                <mat-icon>add</mat-icon>
                Créer un ticket
              </button>
              <button mat-stroked-button routerLink="/tickets">
                <mat-icon>list</mat-icon>
                Voir mes tickets
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="recent-activity" *ngIf="authService.isAdmin()">
        <mat-card class="activity-card fade-in">
          <mat-card-header>
            <mat-card-title>Activité récente</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item">
                <mat-icon class="activity-icon">info</mat-icon>
                <div class="activity-content">
                  <p class="activity-text">Système initialisé avec succès</p>
                  <span class="activity-time">Il y a quelques instants</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }

    .dashboard-subtitle {
      font-size: 1.125rem;
      color: #64748b;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
    }

    .stat-icon-wrapper {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon-wrapper.equipements {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .stat-icon-wrapper.pannes {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .stat-icon-wrapper.tickets {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .stat-icon {
      color: white;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .stat-info {
      flex: 1;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-actions {
      padding: 0 1.5rem 1rem 1.5rem;
    }

    .stat-actions button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quick-actions, .recent-activity {
      margin-bottom: 2rem;
    }

    .action-card, .activity-card {
      border-radius: 12px;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-buttons button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
    }

    .activity-icon {
      color: #667eea;
      margin-top: 0.125rem;
    }

    .activity-content {
      flex: 1;
    }

    .activity-text {
      margin: 0 0 0.25rem 0;
      color: #1e293b;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .dashboard-title {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-buttons button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  equipementsCount = 0;
  pannesCount = 0;
  ticketsCount = 0;

  constructor(
    public authService: AuthService,
    private equipementService: EquipementService,
    private ticketService: TicketService,
    private panneService: PanneService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadStats();
  }

  private loadStats() {
    if (this.authService.isAdmin()) {
      this.equipementService.getAll().subscribe({
        next: (equipements) => this.equipementsCount = equipements.length,
        error: () => this.equipementsCount = 0
      });

      this.panneService.getAll().subscribe({
        next: (pannes) => this.pannesCount = pannes.length,
        error: () => this.pannesCount = 0
      });

      this.ticketService.getAll().subscribe({
        next: (tickets) => this.ticketsCount = tickets.length,
        error: () => this.ticketsCount = 0
      });
    } else if (this.authService.isTechnicien()) {
      this.ticketService.getAssignedTickets().subscribe({
        next: (tickets) => this.ticketsCount = tickets.length,
        error: () => this.ticketsCount = 0
      });
    } else {
      this.ticketService.getMyTickets().subscribe({
        next: (tickets) => this.ticketsCount = tickets.length,
        error: () => this.ticketsCount = 0
      });
    }
  }
}
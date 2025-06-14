import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EquipementService } from '../../../core/services/equipement.service';
import { EquipementDto } from '../../../core/models/equipement.model';

@Component({
  selector: 'app-equipements-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Gestion des Équipements</h1>
          <p class="page-subtitle">Gérez tous vos équipements informatiques</p>
        </div>
        <button mat-raised-button color="primary" routerLink="/equipements/create" class="add-button">
          <mat-icon>add</mat-icon>
          Ajouter un équipement
        </button>
      </div>

      <mat-card class="data-card fade-in">
        <mat-card-content>
          <div class="table-container" *ngIf="equipements.length > 0; else noData">
            <table mat-table [dataSource]="equipements" class="equipements-table">
              <ng-container matColumnDef="nom">
                <th mat-header-cell *matHeaderCellDef>Nom</th>
                <td mat-cell *matCellDef="let equipement">
                  <div class="equipment-name">
                    <mat-icon class="equipment-icon">devices</mat-icon>
                    {{ equipement.nom }}
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let equipement">{{ equipement.type }}</td>
              </ng-container>

              <ng-container matColumnDef="dateAchat">
                <th mat-header-cell *matHeaderCellDef>Date d'achat</th>
                <td mat-cell *matCellDef="let equipement">
                  {{ equipement.dateAchat | date:'dd/MM/yyyy' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="etat">
                <th mat-header-cell *matHeaderCellDef>État</th>
                <td mat-cell *matCellDef="let equipement">
                  <span class="status-badge" [ngClass]="getStatusClass(equipement.etat)">
                    {{ getStatusLabel(equipement.etat) }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let equipement">
                  <div class="action-buttons">
                    <button mat-icon-button color="primary" 
                            [routerLink]="['/equipements/edit', equipement.id]"
                            matTooltip="Modifier">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" 
                            (click)="deleteEquipement(equipement)"
                            matTooltip="Supprimer">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
            </table>
          </div>

          <ng-template #noData>
            <div class="no-data">
              <mat-icon class="no-data-icon">devices_other</mat-icon>
              <h3>Aucun équipement</h3>
              <p>Commencez par ajouter votre premier équipement</p>
              <button mat-raised-button color="primary" routerLink="/equipements/create">
                <mat-icon>add</mat-icon>
                Ajouter un équipement
              </button>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1rem;
    }

    .header-content {
      flex: 1;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }

    .page-subtitle {
      color: #64748b;
      margin: 0;
      font-size: 1rem;
    }

    .add-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .data-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .table-container {
      overflow-x: auto;
    }

    .equipements-table {
      width: 100%;
      background: white;
    }

    .equipment-name {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .equipment-icon {
      color: #667eea;
      font-size: 1.25rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .status-badge.status-actif {
      background-color: #dcfce7;
      color: #166534;
    }

    .status-badge.status-inactif {
      background-color: #fef2f2;
      color: #991b1b;
    }

    .status-badge.status-maintenance {
      background-color: #fef3c7;
      color: #92400e;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .table-row {
      transition: background-color 0.2s ease;
    }

    .table-row:hover {
      background-color: #f8fafc;
    }

    .no-data {
      text-align: center;
      padding: 3rem 1rem;
      color: #64748b;
    }

    .no-data-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #cbd5e1;
      margin-bottom: 1rem;
    }

    .no-data h3 {
      margin: 0 0 0.5rem 0;
      color: #475569;
    }

    .no-data p {
      margin: 0 0 1.5rem 0;
    }

    .no-data button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .add-button {
        justify-content: center;
      }

      .page-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class EquipementsListComponent implements OnInit {
  equipements: EquipementDto[] = [];
  displayedColumns: string[] = ['nom', 'type', 'dateAchat', 'etat', 'actions'];

  constructor(
    private equipementService: EquipementService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEquipements();
  }

  loadEquipements() {
    this.equipementService.getAll().subscribe({
      next: (equipements) => {
        this.equipements = equipements;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des équipements', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deleteEquipement(equipement: EquipementDto) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'équipement "${equipement.nom}" ?`)) {
      this.equipementService.delete(equipement.id!).subscribe({
        next: () => {
          this.snackBar.open('Équipement supprimé avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadEquipements();
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getStatusClass(etat: string): string {
    return `status-${etat.toLowerCase()}`;
  }

  getStatusLabel(etat: string): string {
    const labels: { [key: string]: string } = {
      'ACTIF': 'Actif',
      'INACTIF': 'Inactif',
      'MAINTENANCE': 'Maintenance'
    };
    return labels[etat] || etat;
  }
}
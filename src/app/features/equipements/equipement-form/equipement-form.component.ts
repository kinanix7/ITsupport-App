import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EquipementService } from '../../../core/services/equipement.service';
import { EquipementDto, EquipementEtat } from '../../../core/models/equipement.model';

@Component({
  selector: 'app-equipement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <button mat-icon-button (click)="goBack()" class="back-button">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="header-content">
          <h1 class="page-title">
            {{ isEditMode ? 'Modifier l\'équipement' : 'Nouvel équipement' }}
          </h1>
          <p class="page-subtitle">
            {{ isEditMode ? 'Modifiez les informations de l\'équipement' : 'Ajoutez un nouvel équipement au système' }}
          </p>
        </div>
      </div>

      <mat-card class="form-card fade-in">
        <mat-card-content>
          <form [formGroup]="equipementForm" (ngSubmit)="onSubmit()" class="equipement-form">
            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Nom de l'équipement</mat-label>
                <input matInput formControlName="nom" placeholder="Ex: Ordinateur portable Dell">
                <mat-icon matSuffix>devices</mat-icon>
                <mat-error *ngIf="equipementForm.get('nom')?.hasError('required')">
                  Le nom est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Type</mat-label>
                <input matInput formControlName="type" placeholder="Ex: Ordinateur portable">
                <mat-icon matSuffix>category</mat-icon>
                <mat-error *ngIf="equipementForm.get('type')?.hasError('required')">
                  Le type est requis
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Date d'achat</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="dateAchat">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="equipementForm.get('dateAchat')?.hasError('required')">
                  La date d'achat est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>État</mat-label>
                <mat-select formControlName="etat">
                  <mat-option value="ACTIF">Actif</mat-option>
                  <mat-option value="INACTIF">Inactif</mat-option>
                  <mat-option value="MAINTENANCE">Maintenance</mat-option>
                </mat-select>
                <mat-error *ngIf="equipementForm.get('etat')?.hasError('required')">
                  L'état est requis
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()" class="cancel-button">
                Annuler
              </button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="equipementForm.invalid || isLoading" class="submit-button">
                <mat-icon *ngIf="!isLoading">{{ isEditMode ? 'save' : 'add' }}</mat-icon>
                <span *ngIf="!isLoading">{{ isEditMode ? 'Modifier' : 'Ajouter' }}</span>
                <span *ngIf="isLoading">{{ isEditMode ? 'Modification...' : 'Ajout...' }}</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-button {
      margin-top: 0.5rem;
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

    .form-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .equipement-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .cancel-button {
      min-width: 100px;
    }

    .submit-button {
      min-width: 120px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .cancel-button,
      .submit-button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class EquipementFormComponent implements OnInit {
  equipementForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  equipementId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private equipementService: EquipementService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.equipementForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      dateAchat: ['', Validators.required],
      etat: ['ACTIF', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.equipementId = +id;
      this.loadEquipement();
    }
  }

  loadEquipement() {
    if (this.equipementId) {
      this.equipementService.getById(this.equipementId).subscribe({
        next: (equipement) => {
          this.equipementForm.patchValue({
            nom: equipement.nom,
            type: equipement.type,
            dateAchat: new Date(equipement.dateAchat),
            etat: equipement.etat
          });
        },
        error: (error) => {
          this.snackBar.open('Erreur lors du chargement de l\'équipement', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.goBack();
        }
      });
    }
  }

  onSubmit() {
    if (this.equipementForm.valid) {
      this.isLoading = true;
      const formValue = this.equipementForm.value;
      
      const equipementData: EquipementDto = {
        nom: formValue.nom,
        type: formValue.type,
        dateAchat: formValue.dateAchat.toISOString().split('T')[0],
        etat: formValue.etat
      };

      const operation = this.isEditMode 
        ? this.equipementService.update(this.equipementId!, equipementData)
        : this.equipementService.create(equipementData);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditMode ? 'Équipement modifié avec succès' : 'Équipement ajouté avec succès',
            'Fermer',
            {
              duration: 3000,
              panelClass: ['success-snackbar']
            }
          );
          this.router.navigate(['/equipements']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            this.isEditMode ? 'Erreur lors de la modification' : 'Erreur lors de l\'ajout',
            'Fermer',
            {
              duration: 5000,
              panelClass: ['error-snackbar']
            }
          );
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/equipements']);
  }
}
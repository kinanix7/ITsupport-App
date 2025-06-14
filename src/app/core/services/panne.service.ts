import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PanneDto } from '../models/panne.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanneService {
  private readonly API_URL = environment.apiUrl + '/pannes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PanneDto[]> {
    return this.http.get<PanneDto[]>(this.API_URL);
  }

  create(panne: PanneDto): Observable<PanneDto> {
    return this.http.post<PanneDto>(this.API_URL, panne);
  }

  getByEquipementId(equipementId: number): Observable<PanneDto[]> {
    return this.http.get<PanneDto[]>(`${this.API_URL}/equipement/${equipementId}`);
  }
}
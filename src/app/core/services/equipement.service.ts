import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EquipementDto } from '../models/equipement.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private readonly API_URL = environment.apiUrl + '/v1';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EquipementDto[]> {
    return this.http.get<EquipementDto[]>(this.API_URL);
  }

  getById(id: number): Observable<EquipementDto> {
    return this.http.get<EquipementDto>(`${this.API_URL}/${id}`);
  }

  create(equipement: EquipementDto): Observable<EquipementDto> {
    return this.http.post<EquipementDto>(`${this.API_URL}/add`, equipement);
  }

  update(id: number, equipement: EquipementDto): Observable<EquipementDto> {
    return this.http.put<EquipementDto>(`${this.API_URL}/${id}`, equipement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TicketDto } from '../models/ticket.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly API_URL = environment.apiUrl + '/tickets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(this.API_URL);
  }

  getMyTickets(): Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(`${this.API_URL}/mytickets`);
  }

  getAssignedTickets(): Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(`${this.API_URL}/assigned`);
  }

  create(ticket: TicketDto): Observable<TicketDto> {
    return this.http.post<TicketDto>(this.API_URL, ticket);
  }

  updateStatus(id: number, status: string): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.API_URL}/${id}/status`, { statut: status });
  }

  assignToTechnician(ticketId: number, technicienId: number): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.API_URL}/${ticketId}/assign/${technicienId}`, {});
  }
}
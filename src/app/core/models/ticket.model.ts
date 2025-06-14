export interface Ticket {
  id?: number;
  titre: string;
  description: string;
  dateCreation: string;
  statut: TicketStatut;
  equipementId?: number;
  demandeurId?: number;
  technicienId?: number;
}

export enum TicketStatut {
  OUVERT = 'OUVERT',
  EN_COURS = 'EN_COURS',
  FERME = 'FERME'
}

export interface TicketDto {
  id?: number;
  titre: string;
  description: string;
  dateCreation: string;
  statut: string;
}
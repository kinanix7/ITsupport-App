export interface Equipement {
  id?: number;
  nom: string;
  type: string;
  dateAchat: string;
  etat: EquipementEtat;
}

export enum EquipementEtat {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  MAINTENANCE = 'MAINTENANCE'
}

export interface EquipementDto {
  id?: number;
  nom: string;
  type: string;
  dateAchat: string;
  etat: string;
}
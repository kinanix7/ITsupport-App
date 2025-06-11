package com.example.itsupportapp.dto;

import com.example.itsupportapp.model.Equipement;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EquipementDto implements Serializable {
    Long id;
    String nom;
    String type;
    LocalDate dateAchat;
    String etat;
}
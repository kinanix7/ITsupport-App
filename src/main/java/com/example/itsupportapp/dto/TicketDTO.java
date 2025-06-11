package com.example.itsupportapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TicketDTO {

    private Long id;

    private String titre;


    private String description;

    private LocalDateTime dateCreation;

    private String statut;
}

package com.example.itsupportapp.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PanneDTO {

    private Long id;
    private LocalDateTime datePanne;
    private String description;
    private Long equipementId;
}


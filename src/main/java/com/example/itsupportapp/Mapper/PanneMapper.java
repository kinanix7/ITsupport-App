package com.example.itsupportapp.Mapper;


import com.example.itsupportapp.dto.PanneDTO;
import com.example.itsupportapp.model.Panne;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring" , unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface PanneMapper {



        PanneDTO toDTO(Panne panne);
        Panne toEntity(PanneDTO panneDTO);

}


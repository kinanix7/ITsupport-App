package com.example.itsupportapp.Mapper;

import com.example.itsupportapp.dto.TicketDTO;
import com.example.itsupportapp.model.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring" , unmappedSourcePolicy = ReportingPolicy.IGNORE)

public interface TicketMapper {

    TicketDTO toTicketDTO(Ticket ticket);
    Ticket toTicketEntity (TicketDTO ticketDTO);

}

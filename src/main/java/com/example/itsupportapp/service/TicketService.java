package com.example.itsupportapp.service;

import com.example.itsupportapp.Mapper.TicketMapper;
import com.example.itsupportapp.dto.TicketDTO;
import com.example.itsupportapp.model.Ticket;
import com.example.itsupportapp.repository.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;


    public TicketDTO createTicket(TicketDTO ticketDTO) {
        return  ticketMapper.toTicketDTO(ticketRepository
                .save(ticketMapper.toTicketEntity(ticketDTO)));
    }
    public List<TicketDTO> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(ticket->ticketMapper.toTicketDTO(ticket))
                .toList();
    }

    public TicketDTO getTicketById(long id) {
        return ticketRepository.findById(id)
                .map(ticketMapper::toTicketDTO)
                .orElseThrow(()-> new RuntimeException("Ticket not found"));
    }


    public TicketDTO updateTicket(long id, TicketDTO ticketDTO) {

        Ticket ticket = ticketRepository.findById(id).get();
        ticket.setStatut(ticketDTO.getStatut());
        ticket.setDescription(ticketDTO.getDescription());
        ticket.setTitre(ticketDTO.getTitre());
        ticket.setDescription(ticketDTO.getDescription());
        return ticketMapper.toTicketDTO(ticketRepository.save(ticket));

    }


}

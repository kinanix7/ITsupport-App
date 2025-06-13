package com.example.itsupportapp.service;


import com.example.itsupportapp.dto.PanneDTO;

import com.example.itsupportapp.Mapper.PanneMapper;
import com.example.itsupportapp.repository.EquipementRepository;
import com.example.itsupportapp.repository.PanneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class PanneService {

    private final PanneRepository panneRepository;
    private final EquipementRepository equipementRepository;
    private  PanneMapper panneMapper;

    public PanneService(PanneRepository panneRepository, EquipementRepository equipementRepository, PanneMapper panneMapper) {
        this.panneRepository = panneRepository;
        this.equipementRepository = equipementRepository;
        this.panneMapper = panneMapper;
    }


    public PanneDTO createPanne(PanneDTO panneDTO) {
        return panneMapper.toDTO(panneRepository.save(panneMapper.toEntity(panneDTO)));
    }
    public List<PanneDTO> getAllPannes() {
        return panneRepository.findAll().stream()
                .map(panne ->panneMapper.toDTO(panne))
                .toList();

    }


}

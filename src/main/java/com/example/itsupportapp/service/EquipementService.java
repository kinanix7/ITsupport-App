package com.example.itsupportapp.service;

import com.example.itsupportapp.dto.EquipementDto;
import com.example.itsupportapp.model.Equipement;
import com.example.itsupportapp.repository.EquipementRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EquipementService {
    public  final EquipementRepository equipementRepository;
    public  final ModelMapper modelMapper;
    public EquipementDto save(EquipementDto equipementDto) {
        Equipement equipement=modelMapper.map(equipementDto,Equipement.class);
        Equipement saved=equipementRepository.save(equipement);
        return modelMapper.map(saved,EquipementDto.class);
    }
    public List<EquipementDto> findAll() {
        List<Equipement> equipements=equipementRepository.findAll();
        return equipements.stream()
                .map(x->modelMapper.map(x,EquipementDto.class))
                .collect(Collectors.toList());
    }
    public EquipementDto update(Long id ,EquipementDto equipementDto) {
        Equipement equipement=equipementRepository.findById(id).get();
        equipement.setNom(equipementDto.getNom());
        equipement.setType(equipementDto.getType());
        equipement.setEtat(equipementDto.getEtat());
        equipement.setDateAchat(equipementDto.getDateAchat());
        Equipement saved=equipementRepository.save(equipement);
        return modelMapper.map(saved,EquipementDto.class);
    }
    public void delete(Long id) {
        equipementRepository.deleteById(id);
    }

}

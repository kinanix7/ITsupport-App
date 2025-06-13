package com.example.itsupportapp.controller;

import com.example.itsupportapp.dto.EquipementDto;
import com.example.itsupportapp.model.Equipement;
import com.example.itsupportapp.service.EquipementService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1")
public class EquipementController {
    public final EquipementService equipementService;
    @PostMapping("/add")
    public ResponseEntity<EquipementDto> add(@RequestBody EquipementDto equipementDto) {
        EquipementDto saved = equipementService.save(equipementDto);
        return ResponseEntity.ok().body(saved);
    }
    @GetMapping()
    public ResponseEntity<List<EquipementDto>> getAll() {
        List<EquipementDto> equipementDtos = equipementService.findAll();
        return ResponseEntity.ok().body(equipementDtos);
    }
    @PutMapping ("/{id}")
    public ResponseEntity<EquipementDto> update(@PathVariable Long id,@RequestBody EquipementDto equipementDto) {
        EquipementDto saved = equipementService.update(id,equipementDto);
        return ResponseEntity.ok().body(saved);
    }
    @DeleteMapping("{idD}")
    public ResponseEntity<EquipementDto> delete(@PathVariable Long idD){
        equipementService.delete(idD);
    return ResponseEntity.ok().build();
    }
}
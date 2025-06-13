package com.example.itsupportapp.controller;

import com.example.itsupportapp.dto.PanneDTO;
import com.example.itsupportapp.service.PanneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pannes")
//@CrossOrigin(origins = "*") // optionnel, selon votre configuration frontend
public class PanneController {

    private final PanneService panneService;

    public PanneController(PanneService panneService) {
        this.panneService = panneService;
    }

    //  POST
    @PostMapping
    public ResponseEntity<PanneDTO> createPanne(@RequestBody PanneDTO panneDTO) {
        PanneDTO created = panneService.createPanne(panneDTO);
        return ResponseEntity.ok().body(created);
    }

    //  GET
    @GetMapping
    public ResponseEntity<List<PanneDTO>> getAllPannes() {
        return ResponseEntity.ok(panneService.getAllPannes());
    }


}

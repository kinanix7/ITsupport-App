package com.example.itsupportapp.repository;

import com.example.itsupportapp.model.Equipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipementRepository  extends JpaRepository<Equipement,Long> {
}

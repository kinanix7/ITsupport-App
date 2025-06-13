package com.example.itsupportapp.repository;


import com.example.itsupportapp.model.Panne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanneRepository extends JpaRepository<Panne, Long> {

    List<Panne> findByEquipementId(Long equipementId);

}

package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailRepository extends JpaRepository<Detail,Long> {
}

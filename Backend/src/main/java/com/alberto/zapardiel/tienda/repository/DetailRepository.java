package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Detail Repository
 * @author Alberto Zapardiel Fernández
*/
@Repository
public interface DetailRepository extends JpaRepository<Detail,Long> {

    /**
     * Method to get a list of details by invoice id
     * @param id the invoice id
     * @return the list of details
     */
    List<Detail> findAllByInvoiceId(Long id);
}

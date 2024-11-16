package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Invoice Repository
 * @author Alberto Zapardiel Fernández
*/
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

}

package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Invoice Repository
 * @author Alberto Zapardiel Fernández
*/
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

    /**
     * Method to get invoices by dni and date
     *
     * @param dni  the dni
     * @param date the date
     * @return the invoices
     */
    List<Invoice> findByDniAndDate(String dni, LocalDate date);

    /**
     * Method to get invoices by dni
     *
     * @param dni the dni
     * @return the invoices
     */
    List<Invoice> findByDni(String dni);

    /**
     * Method to get invoices by date
     *
     * @param date the date
     * @return the invoices
     */
    List<Invoice> findByDate(LocalDate date);

    /**
     * Method to get the invoices
     *
     * @param dni          the dni
     * @param minLocalDate the min date
     * @param maxLocalDate the max date
     * @return the invoices
     */
    List<Invoice> findByDniAndDateBetween(String dni, LocalDate minLocalDate, LocalDate maxLocalDate);


    List<Invoice> findByDateBetween(LocalDate minLocalDate, LocalDate maxLocalDate);

    List<Invoice> findByDniAndDateGreaterThanEqual(String dni, LocalDate minLocalDate);

    List<Invoice> findByDateGreaterThanEqual(LocalDate minLocalDate);

    List<Invoice> findByDateLessThanEqual(LocalDate maxLocalDate);
}

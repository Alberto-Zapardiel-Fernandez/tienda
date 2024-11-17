package com.alberto.zapardiel.tienda.service.invoice;

import com.alberto.zapardiel.tienda.model.Invoice;

import java.time.LocalDate;
import java.util.List;

/**
 * Invoice Service
 * @author Alberto Zapardiel Fernández
*/
public interface InvoiceService {

    /**
     * Method to create an invoice
     * @param invoice the list
     * @return the return
     */
    Long createInvoice(Invoice invoice);

    /**
     * Method to get the invoices
     * @param dni the dni
     * @param minLocalDate the min date
     * @param maxLocalDate the max date
     * @return the invoices
     */
    List<Invoice> getInvoices(String dni, LocalDate minLocalDate, LocalDate maxLocalDate);
}

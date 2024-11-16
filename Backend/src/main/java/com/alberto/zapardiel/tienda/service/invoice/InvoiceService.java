package com.alberto.zapardiel.tienda.service.invoice;

import com.alberto.zapardiel.tienda.model.Invoice;

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
}

package com.alberto.zapardiel.tienda.service.invoice;

import com.alberto.zapardiel.tienda.model.Invoice;
import com.alberto.zapardiel.tienda.repository.InvoiceRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Invoice Service Impl
 * @author Alberto Zapardiel Fernández
*/
@Service
@Slf4j
@AllArgsConstructor
public class InvoiceServiceImpl implements InvoiceService{

    /**
     * The invoice repository
     */
    private InvoiceRepository invoiceRepository;

    /**
     * Method to create an invoice
     *
     * @param invoice the list
     * @return the return
     */
    @Override
    public Long createInvoice(Invoice invoice) {
        Invoice invoiceInserted = invoiceRepository.save(invoice);
        return invoiceInserted.getId();
    }
}

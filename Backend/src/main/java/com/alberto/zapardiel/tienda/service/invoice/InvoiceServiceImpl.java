package com.alberto.zapardiel.tienda.service.invoice;

import com.alberto.zapardiel.tienda.model.Invoice;
import com.alberto.zapardiel.tienda.repository.InvoiceRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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

    /**
     * Method to get the invoices
     *
     * @param dni          the dni
     * @param minLocalDate the min date
     * @param maxLocalDate the max date
     * @return the invoices
     */
    @Override
    public List<Invoice> getInvoices(String dni, LocalDate minLocalDate, LocalDate maxLocalDate) {
        if (dni != null && minLocalDate != null && maxLocalDate != null) {
            return invoiceRepository.findByDniAndDateBetween(dni, minLocalDate, maxLocalDate);
        } else if (dni != null && minLocalDate != null) {
            return invoiceRepository.findByDniAndDateGreaterThanEqual(dni, minLocalDate);
        } else if (dni != null) {
            return invoiceRepository.findByDni(dni);
        } else if (minLocalDate != null && maxLocalDate != null) {
            return invoiceRepository.findByDateBetween(minLocalDate, maxLocalDate);
        } else if (minLocalDate != null) {
            return invoiceRepository.findByDateGreaterThanEqual(minLocalDate);
        } else if (maxLocalDate != null) {
            return invoiceRepository.findByDateLessThanEqual(maxLocalDate);
        } else {
            return invoiceRepository.findAll();
        }
    }
}

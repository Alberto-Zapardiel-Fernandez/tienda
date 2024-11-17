package com.alberto.zapardiel.tienda.service.detail;

import com.alberto.zapardiel.tienda.model.Detail;

import java.util.List;
import java.util.Optional;

/**
 * Detail Service
 * @author Alberto Zapardiel Fernández
*/
public interface DetailService {

    /**
     * Save detail
     * @param detail the detail
     */
    void saveDetail(Detail detail);

    /**
     * Method to get a detail by his id
     * @param id the id
     * @return the detail
     */
    Optional<Detail> getDetailById(Long id);

    /**
     * Method to get a detail by his invoice id
     * @param id the invoice id
     * @return the detail list
     */
    Optional<List<Detail>> getDetailByInvoiceId(Long id);
}

package com.alberto.zapardiel.tienda.service.excel;

import org.springframework.http.ResponseEntity;

import java.io.IOException;

/**
 * Excel Service
 * @author Alberto Zapardiel Fernández
 */
public interface ExcelService {

    /**
     * Method to generate Excel
     * @param id the id
     * @return the Excel
     */
    ResponseEntity<byte[]> generateExcel(Long id) throws IOException;
}

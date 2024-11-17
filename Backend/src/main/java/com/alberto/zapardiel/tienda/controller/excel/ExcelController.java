package com.alberto.zapardiel.tienda.controller.excel;

import com.alberto.zapardiel.tienda.service.excel.ExcelService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * Excel controller
 * @author alberto zapardiel fernandez
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ExcelController {

    private ExcelService excelService;

    @GetMapping("/getExcel")
    public ResponseEntity<byte[]> getExcel(@RequestParam("num_factura") Long id) throws IOException {
        return excelService.generateExcel(id);
    }
}

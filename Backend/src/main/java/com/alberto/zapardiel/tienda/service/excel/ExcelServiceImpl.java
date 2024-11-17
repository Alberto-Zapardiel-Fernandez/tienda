package com.alberto.zapardiel.tienda.service.excel;

import com.alberto.zapardiel.tienda.model.Detail;
import com.alberto.zapardiel.tienda.repository.DetailRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Excel Service Impl
 * @author Alberto Zapardiel Fernández
*/
@Service
@AllArgsConstructor
@Slf4j
public class ExcelServiceImpl implements ExcelService{

    private DetailRepository detailRepository;
    /**
     * Method to generate Excel
     *
     * @param id the id
     * @return the Excel
     */
    @Override
    public ResponseEntity<byte[]> generateExcel(Long id) throws IOException {

        try {

            // Crear un nuevo workbook de Excel
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Datos de la factura");
            Row row = sheet.createRow(1);
            Cell cell = row.createCell(0);
            cell.setCellValue("PRUEBA");
            List<Detail> detailList = detailRepository.findAllByInvoiceId(id);


            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.attachment().filename("detalle.xlsx").build());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(outputStream.toByteArray());
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.ok(null);
        }
    }
}

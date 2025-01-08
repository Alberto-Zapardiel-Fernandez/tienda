package com.alberto.zapardiel.tienda.service.excel;

import com.alberto.zapardiel.tienda.model.Client;
import com.alberto.zapardiel.tienda.model.Detail;
import com.alberto.zapardiel.tienda.model.Product;
import com.alberto.zapardiel.tienda.repository.ClientRepository;
import com.alberto.zapardiel.tienda.repository.DetailRepository;
import com.alberto.zapardiel.tienda.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
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
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

/**
 * Excel Service Impl
 *
 * @author Alberto Zapardiel Fernández
 */
@Service
@AllArgsConstructor
@Slf4j
public class ExcelServiceImpl implements ExcelService {

    /**
     * The Detail Repository
     */
    private DetailRepository detailRepository;

    /**
     * The Product Repository
     */
    private ProductRepository productRepository;

    /**
     * The Client Repository
     */
    private ClientRepository clientRepository;

    /**
     * Method to generate Excel
     *
     * @param id the id
     * @return the Excel
     */
    @Override
    public ResponseEntity<byte[]> generateExcel(Long id) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de la factura");
            CellStyle boldStyle = createBoldStyle(workbook);
            CellStyle normalStyle = createNormalStyle(workbook);

            Row row = sheet.createRow(1);
            Cell cell = row.createCell(2);
            cell.setCellValue("DATOS DEL CLIENTE");
            cell.setCellStyle(boldStyle);
            List<Detail> detailList = detailRepository.findAllByInvoiceId(id);
            fillClientData(detailList, sheet, boldStyle, normalStyle);
            fillProductHeader(sheet, boldStyle);
            fillProductData(detailList, sheet, normalStyle, boldStyle);

            setColumnWidth(sheet);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.attachment().filename("detalle.xlsx").build());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(outputStream.toByteArray());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.ok(null);
        }
    }

    /**
     * Fill product header
     *
     * @param sheet     the sheet
     * @param boldStyle the bold style
     */
    private void fillProductHeader(Sheet sheet, CellStyle boldStyle) {
        Row productHeader = sheet.createRow(8);
        createCell(productHeader, 0, "Producto", boldStyle);
        createCell(productHeader, 1, "Cantidad", boldStyle);
        createCell(productHeader, 2, "Precio Unitario", boldStyle);
        createCell(productHeader, 3, "Precio Total", boldStyle);
    }

    /**
     * Fill client data
     *
     * @param detailList  the detail list
     * @param sheet       the sheet
     * @param boldStyle   the bold style
     * @param normalStyle the normal style
     */
    private void fillClientData(List<Detail> detailList, Sheet sheet, CellStyle boldStyle, CellStyle normalStyle) {
        Client client = clientRepository.findByDni(detailList.getFirst().getDni());
        Row clientHeader = sheet.createRow(3);
        createCell(clientHeader, 0, "Nombre", boldStyle);
        createCell(clientHeader, 2, "Dirección", boldStyle);
        createCell(clientHeader, 4, "Teléfono", boldStyle);

        Row clientData = sheet.createRow(4);
        createCell(clientData, 0, client.getName() + " " + client.getLastName(), normalStyle);
        createCell(clientData, 2, client.getAddress(), normalStyle);
        createCell(clientData, 4, client.getPhone(), normalStyle);
    }

    /**
     * Fill product data
     *
     * @param detailList  the detail list
     * @param sheet       the sheet
     * @param normalStyle the normal style
     * @param boldStyle   the bold style
     */
    private void fillProductData(List<Detail> detailList, Sheet sheet, CellStyle normalStyle, CellStyle boldStyle) {
        int rowStart = 9;
        BigDecimal subtotal = BigDecimal.ZERO;
        for (Detail detail : detailList) {
            Optional<Product> productOptional = productRepository.findById(detail.getProductId());
            Product product = productOptional.orElse(null);
            if (product != null) {
                Row productRow = sheet.createRow(rowStart);
                createCell(productRow, 0, product.getName(), normalStyle);
                createCell(productRow, detail.getQuantity(), boldStyle);
                createCell(productRow, 2, product.getPrice() + "€", normalStyle);
                BigDecimal productTotal = new BigDecimal(detail.getQuantity()).multiply(product.getPrice());
                createCell(productRow, 3, productTotal + "€", normalStyle);
                subtotal = subtotal.add(productTotal);
                rowStart++;
            }
        }
        BigDecimal vatRate = new BigDecimal("0.21");
        BigDecimal vatAmount = subtotal.multiply(vatRate).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalAmount = subtotal.add(vatAmount).setScale(2, RoundingMode.HALF_UP);

        Row ivaRow = sheet.createRow(rowStart);
        createCell(ivaRow, 2, "IVA aplicado 21%", boldStyle);
        createCell(ivaRow, 3, vatAmount + "€", normalStyle);

        Row totalRow = sheet.createRow(rowStart + 1);
        createCell(totalRow, 2, "Total", boldStyle);
        createCell(totalRow, 3, totalAmount + "€", normalStyle);
    }

    /**
     * Set column width
     *
     * @param sheet the sheet
     */
    private static void setColumnWidth(Sheet sheet) {
        sheet.setColumnWidth(0, 24 * 256);
        sheet.setColumnWidth(1, 10 * 256);
        sheet.setColumnWidth(2, 28 * 256);
        sheet.setColumnWidth(3, 24 * 256);
        sheet.setColumnWidth(4, 24 * 256);
    }

    /**
     * Create bold style
     *
     * @param workbook the workbook
     * @return the cell style
     */
    private CellStyle createBoldStyle(Workbook workbook) {
        CellStyle boldStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 12);
        boldStyle.setFont(font);
        return boldStyle;
    }

    /**
     * Create normal style
     *
     * @param workbook the workbook
     * @return the cell style
     */
    private CellStyle createNormalStyle(Workbook workbook) {
        CellStyle normalStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 12);
        normalStyle.setFont(font);
        return normalStyle;
    }

    /**
     * Create cell
     *
     * @param row    the row
     * @param column the column
     * @param value  the value
     * @param style  the style
     */
    private void createCell(Row row, int column, String value, CellStyle style) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
        cell.setCellStyle(style);
    }

    /**
     * Create cell
     *
     * @param row   the row
     * @param value the value
     * @param style the style
     */
    private void createCell(Row row, int value, CellStyle style) {
        Cell cell = row.createCell(1);
        cell.setCellValue(value);
        cell.setCellStyle(style);
    }

}

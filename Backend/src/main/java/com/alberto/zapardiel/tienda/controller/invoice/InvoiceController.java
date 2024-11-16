package com.alberto.zapardiel.tienda.controller.invoice;

import com.alberto.zapardiel.tienda.model.Detail;
import com.alberto.zapardiel.tienda.model.Invoice;
import com.alberto.zapardiel.tienda.model.Product;
import com.alberto.zapardiel.tienda.service.detail.DetailService;
import com.alberto.zapardiel.tienda.service.invoice.InvoiceService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Invoice Controller
 *
 * @author Alberto Zapardiel Fernández
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
@Validated
public class InvoiceController {

    /**
     * Invoice service
     */
    private InvoiceService invoiceService;

    /**
     * Detail Service
     */
    private DetailService detailService;

    @PostMapping(path = "/save_invoice", name = "saveInvoice")
    public ResponseEntity<Invoice> saveInvoice(@Valid @RequestBody List<Product> products, @RequestParam String dni,
                                              @NotNull @Positive @RequestParam BigDecimal total) {

        try {
            Invoice invoice = Invoice.builder()
                    .dni(dni)
                    .total(total)
                    .date(LocalDate.now())
                    .build();
            Long id = invoiceService.createInvoice(invoice);
            for (Product product : products) {
                Detail detail = Detail.builder()
                        .invoiceId(id)
                        .productId(product.getId())
                        .dni(dni)
                        .cantidadProducto(product.getQuantity())
                        .precioProducto(product.getPrice())
                        .date(LocalDate.now())
                        .build();
                detailService.saveDetail(detail);
            }
            return ResponseEntity.ok(invoice);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Invoice.builder().build());
        }
    }
}

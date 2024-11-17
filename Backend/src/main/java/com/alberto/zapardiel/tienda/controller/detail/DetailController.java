package com.alberto.zapardiel.tienda.controller.detail;

import com.alberto.zapardiel.tienda.model.Detail;
import com.alberto.zapardiel.tienda.service.detail.DetailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

/**
 * Detail Controller
 *
 * @author Alberto Zapardiel Fernández
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
@Validated
public class DetailController {

    /**
     * The detail service
     */
    private DetailService detailService;

    /**
     * Method to get a detail by his id
     * @param id the id
     * @return the detail
     */
    @GetMapping(path = "/detail", name = "getDetail")
    public ResponseEntity<Detail> getDetail(@RequestParam Long id){
        return detailService.getDetailById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(Detail.builder().build()));
    }

    /**
     * Method to get a list of details by the invoice id
     * @param id the invoice id
     * @return the list of invoices
     */
    @GetMapping(path = "/detailByInvoiceId", name = "getDetailByInvoiceId")
    public ResponseEntity<List<Detail>> getDetailByInvoiceId(@RequestParam Long id){
        return detailService.getDetailByInvoiceId(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(Collections.singletonList(Detail.builder().build())));
    }

}

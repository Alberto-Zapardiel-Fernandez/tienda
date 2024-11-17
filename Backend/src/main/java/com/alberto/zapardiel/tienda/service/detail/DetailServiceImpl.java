package com.alberto.zapardiel.tienda.service.detail;

import com.alberto.zapardiel.tienda.model.Detail;
import com.alberto.zapardiel.tienda.model.Product;
import com.alberto.zapardiel.tienda.repository.DetailRepository;
import com.alberto.zapardiel.tienda.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Detail Service Impl
 *
 * @author Alberto Zapardiel Fernández
 */
@Service
@AllArgsConstructor
@Slf4j
public class DetailServiceImpl implements DetailService {

    /**
     * Detail repository
     */
    private DetailRepository detailRepository;

    /**
     * Product repository
     */
    private ProductRepository productRepository;

    /**
     * @param detail the detail
     */
    @Override
    public void saveDetail(Detail detail) {
        detailRepository.save(detail);
        Optional<Product> product = productRepository.findById(detail.getProductId());
        if (product.isPresent()) {
            Product existingProduct = product.get();
            int newStock = existingProduct.getStock() - detail.getCantidadProducto();
            if (newStock >= 0) {
                existingProduct.setStock(newStock);
                productRepository.save(existingProduct);
                log.info("Detalle insertado {}. Stock actualizado para producto {}", detail.getId(), existingProduct.getId());
            } else {
                log.error("Stock insuficiente para el producto {}. Cantidad actual: {}, Cantidad vendida: {}",
                        existingProduct.getId(), existingProduct.getStock(), detail.getCantidadProducto());
            }
        } else {
            log.warn("Producto con ID {} no encontrado", detail.getProductId());
        }
    }

    /**
     * KMethod to get a detail by his id
     * @param id the id
     * @return the detail
     */
    @Override
    public Optional<Detail> getDetailById(Long id) {
        return detailRepository.findById(id);
    }

    /**
     * Method to get a detail by his invoice id
     *
     * @param id the invoice id
     * @return the detail list
     */
    @Override
    public Optional<List<Detail>> getDetailByInvoiceId(Long id) {
        List<Detail> details = detailRepository.findAllByInvoiceId(id);
        return Optional.of(details);
    }
}

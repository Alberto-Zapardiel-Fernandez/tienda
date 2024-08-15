package com.alberto.zapardiel.tienda.service.product;

import com.alberto.zapardiel.tienda.model.Product;
import com.alberto.zapardiel.tienda.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Product service implementation
 *
 * @author Alberto Zapardiel Fernández
 */
@Service
@Slf4j
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    /**
     * Product repository
     */
    private ProductRepository productRepository;

    /**
     * Method to create a product
     *
     * @param product the poduct
     * @return the product
     */
    @Override
    public String createProduct(Product product, String urlImage) {
        product.setImageUrl(urlImage);
        try {
            productRepository.save(product);
            return "Inserted";
        } catch (Exception e) {
            return "Error " + e;
        }
    }
}

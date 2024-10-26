package com.alberto.zapardiel.tienda.service.product;

import com.alberto.zapardiel.tienda.model.Product;

import java.util.List;
import java.util.Optional;

/**
 * Product Service
 * @author Alberto Zapardiel Fernández
 */
public interface ProductService {

    /**
     * Method to create a product
     * @param product the poduct
     * @return the product
     */
    String createProduct(Product product, String urlImage);

    /**
     * Method to get all products
     *
     * @return a list of products
     */
    List<Product> getAllProducts();

    void deleteProduct(Long id);

    Optional<Product> getProductById(Long id);
}

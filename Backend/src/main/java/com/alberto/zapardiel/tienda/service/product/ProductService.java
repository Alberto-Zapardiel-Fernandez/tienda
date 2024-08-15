package com.alberto.zapardiel.tienda.service.product;

import com.alberto.zapardiel.tienda.model.Product;

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
}

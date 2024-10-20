package com.alberto.zapardiel.tienda.service.product;

import com.alberto.zapardiel.tienda.model.Product;

import java.util.List;

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
}

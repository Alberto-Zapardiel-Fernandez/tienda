package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Product Repository
 * @author Alberto Zapardiel Fernández
*/
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}

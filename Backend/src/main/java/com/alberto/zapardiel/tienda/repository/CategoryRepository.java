package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Category Repository
 * @author Alberto Zapardiel Fernández
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    /**
     * Method to get a category by his name
     * @param name the name
     * @return the category
     */
    Category findByName(String name);
    /**
     * Method to get a category by his id
     * @param id the id
     * @return the category
     */
    Category findById(int id);
}

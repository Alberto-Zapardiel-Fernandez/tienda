package com.alberto.zapardiel.tienda.service.category;

import com.alberto.zapardiel.tienda.model.Category;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
 * Category Service
 * @author Alberto Zapardiel Fernández
*/
public interface CategoryService {

    /**
     * Method to get all categories
     *
     * @return all categories
     */
    List<Category> getAllCategories();

    /**
     * Method to create a category
     */
    Category createCategory(Category category);

    /**
     * Method to get a category by his id
     * @param id the id
     * @return the category if exist
     */
    Optional<Category> getCategoryById(Long id);

    /**
     * Method to get the category by his name
     * @param name the name
     * @return the category
     */
    Category findByName(String name);

    /**
     * Method to delete the category
     * @param id the id
     */
    void deleteCategoryById(int id) throws ResponseStatusException;

    /**
     * Method to update a category
     * @param category the category
     * @return the category updated
     */
    Object updateCategory(Category category);

}

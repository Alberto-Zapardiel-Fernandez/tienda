package com.alberto.zapardiel.tienda.service.category;

import com.alberto.zapardiel.tienda.model.Category;
import com.alberto.zapardiel.tienda.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
 * Category service implementation
 *
 * @author Alberto Zapardiel Fernández
 */
@Service
@Slf4j
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    /**
     * Category repository
     */
    private CategoryRepository categoryRepository;

    /**
     * Method to get all categories
     *
     * @return all categories
     */
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Method to create a category
     *
     * @param category the category
     * @return the category inserted
     */
    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    /**
     * Method to get a category by his id
     *
     * @param id the id
     * @return the category if exist
     */
    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    /**
     * Method to get the category by his name
     *
     * @param name the name
     * @return the category
     */
    @Override
    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    /**
     * Method to delete the category
     *
     * @param id the id
     * @throws ResponseStatusException if not found the category to delete
     */
    @Override
    public void deleteCategoryById(int id) throws ResponseStatusException {
        Category category = categoryRepository.findById(id);
        if (category != null){
        categoryRepository.deleteById((long) id);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Category not found");
        }
    }

    /**
     * Method to update a category
     *
     * @param category the category
     * @return the category updated
     */
    @Override
    public Object updateCategory(Category category) {
        Category categoryUpdated = categoryRepository.findById(category.getId());
        if (categoryUpdated != null) {
            categoryUpdated.setName(category.getName());
            categoryUpdated.setDescription(category.getDescription());
            return categoryRepository.save(categoryUpdated);
        } else {
            return Category.builder().id(-1).build();
        }
    }
}

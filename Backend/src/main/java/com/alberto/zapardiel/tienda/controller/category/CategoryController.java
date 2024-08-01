package com.alberto.zapardiel.tienda.controller.category;

import com.alberto.zapardiel.tienda.model.Category;
import com.alberto.zapardiel.tienda.service.category.CategoryService;
import com.alberto.zapardiel.tienda.utils.Utils;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * Category controller
 * @author alberto zapardiel fernandez
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {

    /**
     * Category service
     */
    private CategoryService categoryService;

    /**
     * End point to get the list of categories
     * @return the list of categories or a no content if is empty
     */
    @GetMapping(name = "getAllCategories", path = "/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return categories.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(categories);
    }

    /**
     * End point to create a new category
     * @param category the category data
     * @return the category inserted or a message with the error
     */
    @PostMapping(name = "createCategory", path = "/category", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createCategory(@RequestBody Category category){
        try {
            return ResponseEntity.ok(categoryService.createCategory(category));
        } catch (Exception e) {
            String errorMessage = "Error creating category";
            if (e instanceof DataIntegrityViolationException) {
                errorMessage += ": Possible duplicate entry";
            }
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    /**
     * End point to get a category by his id
     * @param id the category id
     * @return the category
     */
    @GetMapping(name = "getCategoryById", path = "/category/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getCategoryById(@PathVariable(name = "id") Long id){
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(category);
    }

    /**
     * End point to get a category by his name
     * @param name the name
     * @return the category
     */
    @GetMapping("/category/byName")
    public ResponseEntity<Category> getCategoryByName(@RequestParam String name) {
        Category category = categoryService.findByName(Utils.capitalize(name.trim()));
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * End point to find the category, if exists, delete it
     * @param id the id
     * @return the category
     */
    @DeleteMapping(name = "delete category", path = "/category")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        try {
            categoryService.deleteCategoryById(id);
            return new ResponseEntity<>("Category deleted", HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.OK);
        }
    }
    /**
     * End point to find the category, if exists, login him
     * @param category the category
     * @return the category
     */
    @PutMapping(name = "update category", path = "/category")
    public ResponseEntity<Object> updateCategory(@RequestBody Category category) {
        try {
            return ResponseEntity.ok(categoryService.updateCategory(category));
        } catch (Exception e) {
            String errorMessage = "Error updating category";
            if (e instanceof DataIntegrityViolationException) {
                errorMessage += ": Possible duplicate entry";
            }
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}

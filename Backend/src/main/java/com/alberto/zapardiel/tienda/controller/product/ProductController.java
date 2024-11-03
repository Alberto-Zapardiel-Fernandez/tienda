package com.alberto.zapardiel.tienda.controller.product;

import com.alberto.zapardiel.tienda.model.Category;
import com.alberto.zapardiel.tienda.model.Product;
import com.alberto.zapardiel.tienda.service.image.ImageServiceImpl;
import com.alberto.zapardiel.tienda.service.product.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Product controller
 *
 * @author Alberto Zapardiel Fernández
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
@Validated
public class ProductController {

    /**
     * Image service
     */
    private ImageServiceImpl imageService;
    /**
     * Product service
     */
    private ProductService productService;

    /**
     * Endpoint to create a product
     * @param description the description
     * @param idCategory the id category
     * @param name the name
     * @param price the price
     * @param stock the stock
     * @param image the image
     * @return a response
     */
    @PostMapping(value = "/product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createProduct(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @NotBlank @Size(min = 3, max = 50) @RequestParam("name") String name,
            @NotBlank @Size(min = 10) @RequestParam("description") String description,
            @NotNull @Min(0) @RequestParam("price") BigDecimal price,
            @NotNull @Min(0) @RequestParam("stock") Integer stock,
            @NotNull @Min(1) @RequestParam("idCategory") Integer idCategory) {

        String response;
        String urlImage;
        try {
            if (image != null && !image.isEmpty()) {
                urlImage = imageService.uploadImage(image);
            } else {
                urlImage = "src/main/java/com/alberto/zapardiel/tienda/images/default_image.jpg";
            }
            Product product = Product.builder()
                    .name(name)
                    .description(description)
                    .imageUrl(urlImage)
                    .price(price)
                    .stock(stock)
                    .idCategory(Category.builder()
                            .id(idCategory)
                            .build())
                    .build();
            response = productService.createProduct(product, urlImage);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (IOException e) {
            // Manejo de excepción más detallado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image: " + e.getMessage());
        } catch (Exception e) {
            // Manejo de otras excepciones
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating product: " + e.getMessage());
        }
    }
    /**
     * Endpoint to update a product
     * @param id the id
     * @param description the description
     * @param idCategory the id category
     * @param name the name
     * @param price the price
     * @param stock the stock
     * @param image the image
     * @return a response
     */
    @PutMapping(value = "/product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProduct(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("id") String id,
            @NotBlank @Size(min = 3, max = 50) @RequestParam("name") String name,
            @NotBlank @Size(min = 10) @RequestParam("description") String description,
            @NotNull @Min(0) @RequestParam("price") BigDecimal price,
            @NotNull @Min(0) @RequestParam("stock") Integer stock,
            @NotNull @Min(1) @RequestParam("idCategory") Integer idCategory) {

        String response;
        String urlImage;
        try {
            if (image != null && !image.isEmpty()) {
                urlImage = imageService.uploadImage(image);
            } else {
                urlImage = "src/main/java/com/alberto/zapardiel/tienda/images/default_image.jpg";
            }
            Product product = Product.builder()
                    .id(Long.parseLong(id))
                    .name(name)
                    .description(description)
                    .imageUrl(urlImage)
                    .price(price)
                    .stock(stock)
                    .idCategory(Category.builder()
                            .id(idCategory)
                            .build())
                    .build();
            response = productService.createProduct(product, urlImage);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (IOException e) {
            // Manejo de excepción más detallado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image: " + e.getMessage());
        } catch (Exception e) {
            // Manejo de otras excepciones
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating product: " + e.getMessage());
        }
    }

    /**
     * Endpoint to get All products
     *
     * @return a list of products
     */
    @GetMapping(value = "/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);

    }

    /**
     * Method to delete a product
     *
     * @param id the product id
     * @return the value
     */
    @DeleteMapping(value = "/product")
    public ResponseEntity<String> deleteProduct(@RequestParam Long id) {
        try {
            productService.deleteProduct(id);
            Map<String, String> responseBody = Map.of("message", "Product deleted successfully");
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(responseBody);
            return ResponseEntity.ok(jsonResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(value = "/product")
    public ResponseEntity<Optional<Product>> getProductById(@RequestParam Long id){
        try{
            return ResponseEntity.ok(productService.getProductById(id));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}

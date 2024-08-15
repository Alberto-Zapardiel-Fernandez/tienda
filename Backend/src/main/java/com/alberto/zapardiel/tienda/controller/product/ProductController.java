package com.alberto.zapardiel.tienda.controller.product;

import com.alberto.zapardiel.tienda.model.Category;
import com.alberto.zapardiel.tienda.model.Product;
import com.alberto.zapardiel.tienda.service.image.ImageServiceImpl;
import com.alberto.zapardiel.tienda.service.product.ProductService;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

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
     *
     * @return a response
     */
    @PostMapping(value = "/product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createProduct(
            @RequestParam("image") MultipartFile image,
            @NotBlank @Size(min = 3, max = 50) @RequestParam("name") String name,
            @NotBlank @Size(min = 10) @RequestParam("description") String description,
            @NotNull @Min(0) @RequestParam("price") BigDecimal price,
            @NotNull @Min(0) @RequestParam("stock") Integer stock,
            @NotNull @Min(1) @RequestParam("idCategory") Integer idCategory) {

        String response;
        try {
            String urlImage = imageService.uploadImage(image);
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
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IOException e) {
            // Manejo de excepción más detallado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image: " + e.getMessage());
        } catch (Exception e) {
            // Manejo de otras excepciones
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating product: " + e.getMessage());
        }
    }
}
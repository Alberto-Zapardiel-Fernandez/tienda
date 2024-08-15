package com.alberto.zapardiel.tienda.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Product entity
 * @author Alberto Zapardiel Fernández
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "producto")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null
    private Long id;
    /**
     * name
     */
    @Column(name = "nombre")
    @JsonProperty("name")
    private String name;
    /**
     * description
     */
    @Column(name = "descripcion")
    @JsonProperty("descripcion")
    private String description;
    /**
     * price
     */
    @Column(name = "precio")
    @JsonProperty("price")
    private BigDecimal price;
    /**
     * stock
     */
    @Column(name = "stock")
    @JsonProperty("stock")
    private Integer stock;
    /**
     * image_url
     */
    @Column(name = "image_url")
    private String imageUrl;
    /**
     * idCategory
     */
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Category idCategory;
}

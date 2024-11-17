package com.alberto.zapardiel.tienda.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Detail
 * @author Alberto Zapardiel Fernández
*/
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "detalle")
public class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_factura")
    private Long invoiceId;

    @Column(name = "id_producto")
    private Long productId;

    @Column(name = "dni")
    private String dni;

    @Column(name = "cantidad_producto")
    private Integer quantity;

    @Column(name = "precio_producto")
    private BigDecimal price;

    @Column(name = "fecha")
    private LocalDate date;
}

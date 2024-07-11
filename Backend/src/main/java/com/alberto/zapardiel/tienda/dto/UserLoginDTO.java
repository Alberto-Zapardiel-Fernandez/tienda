package com.alberto.zapardiel.tienda.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User Login DTO
 * @author Alberto Zapardiel Fernández
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {

    /**
     * Email
     */
    private String email;

    /**
     * password
     */
    private String pass;
}

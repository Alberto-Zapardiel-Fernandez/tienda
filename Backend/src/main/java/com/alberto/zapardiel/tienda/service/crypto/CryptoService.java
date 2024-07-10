package com.alberto.zapardiel.tienda.service.crypto;

/**
 * Crypto Service
 * @author Alberto Zapardiel Fernández
*/
public interface CryptoService {

    /**
     * Method to encrypt the password
     * @param pass the password
     * @return the password encrypted
     */
    String encryptPass(String pass);

    /**
     * Method to check match between passwords
     * @param pass the pass introduced
     * @param storedPassword the pass stored
     * @return the validation
     */
    Boolean matchPass(String pass, String storedPassword);
}

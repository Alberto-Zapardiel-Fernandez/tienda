package com.alberto.zapardiel.tienda.service.crypto;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Crypto Service Impl
 * @author Alberto Zapardiel Fernández
*/
@Slf4j
@Service
@AllArgsConstructor
public class CryptoServiceImpl implements CryptoService{

    /**
     * Method to encrypt the password
     * @param pass the password
     * @return the password encrypted
     */
    @Override
    public String encryptPass(String pass) {
        return BCrypt.hashpw(pass,BCrypt.gensalt());
    }

    /**
     * Method to encrypt the password
     * @param pass the password
     * @return the password encrypted
     */
    @Override
    public Boolean matchPass(String pass, String storedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(pass, storedPassword);
    }
}

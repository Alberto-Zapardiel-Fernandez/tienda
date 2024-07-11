package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * User Repository
 * @author Alberto Zapardiel Fernández
 */
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    /**
     * Method to get a user by his name
     * @param name the name
     * @return the user
     */
    User findByName(String name);

    /**
     * Method to find a user by his dni
     * @param dni the dni
     * @return the user
     */
    User findByDni(String dni);

    /**
     * Method to find the user, if exists, login him
     * @param email the email
     * @param pass the password
     * @return the user
     */
    User findByEmailAndPass(String email, String pass);
    /**
     * Method to find the user, if exists, login him
     * @param email the email
     * @return the user
     */
    User findByEmail(String email);
}

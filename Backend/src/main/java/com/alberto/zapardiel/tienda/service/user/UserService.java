package com.alberto.zapardiel.tienda.service.user;

import com.alberto.zapardiel.tienda.model.User;

import java.util.List;
import java.util.Optional;

/**
 * User Service
 * @author alberto Zapardiel Fernández
 */
public interface UserService {

    /**
     * Method to get a list of users
     *
     * @return the user's list
     */
    List<User> getAllUsers();

    /**
     * Method to set a user
     * @param user the user data
     * @return the user
     */
    User createUser(User user);

    /**
     * Method to get a user by id
     * @param id the user id
     * @return the user
     */
    Optional<User> getUserById(Long id);

    /**
     * Method to update a user
     * @param user the user
     * @return the user updated
     */
     User updateUser(User user) ;

    /**
     * Method to delete a user
     * @param id the user id to delete
     */
    void deleteUserById(Long id);

    /**
     * Method to get a user by his name
     * @param name the name
     * @return the user
     */
    User findByName(String name);
    /**
     * Method to get a user by his dni
     * @param dni the dni
     * @return the user
     */
    User findByDni(String dni);
}

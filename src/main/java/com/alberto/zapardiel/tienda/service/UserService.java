package com.alberto.zapardiel.tienda.service;

import com.alberto.zapardiel.tienda.model.User;

import java.util.List;

/**
 * User Service
 * June 2024
 *
 * @author alberto Zapardiel Fernández
 */
public interface UserService {

    /**
     * Method to get a list of users
     *
     * @return the user's list
     */
    List<User> getUsers();
}

package com.alberto.zapardiel.tienda.service.user;

import com.alberto.zapardiel.tienda.model.User;
import com.alberto.zapardiel.tienda.repository.UserRepository;
import com.alberto.zapardiel.tienda.utils.Utils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * User Service Impl
 * June 2024
 *
 * @author alberto Zapardiel Fernández
 */
@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    /**
     * User repository
     */
    private UserRepository userRepository;

    /**
     * Method to get a list of users
     *
     * @return the user's list
     */
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Method to set user
     *
     * @param user the user data
     * @return the user
     */
    @Override
    public User createUser(User user) {
        //TODO Aqui encriptar las pass
        user.setName(Utils.capitalize(user.getName()));
        return userRepository.save(user);
    }

    /**
     * Method to get a user by id
     * @param id the user id
     * @return the user
     */
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Method to update a user
     * @param user the user
     * @return the user updated
     */
    @Override
    public User updateUser(User user) {
        //TODO Implementar
        user.setName(Utils.capitalize(user.getName()));
        return userRepository.save(user);
    }

    /**
     * Method to delete a user
     * @param id the user id to delete
     */
    @Override
    public void deleteUserById(Long id) {
        //TODO Implementar y el borrar por dni
        userRepository.deleteById(id);
    }

    /**
     * Method to find a user by his name
     * @param name the name
     * @return the user
     */
    public User findByName(String name){
        return userRepository.findByName(Utils.capitalize(name));
    }
    /**
     * Method to find a user by his dni
     * @param dni the dni
     * @return the user
     */
    public User findByDni(String dni){
        return userRepository.findByDni(dni);
    }
}

package com.alberto.zapardiel.tienda.service.user;

import com.alberto.zapardiel.tienda.model.User;
import com.alberto.zapardiel.tienda.repository.UserRepository;
import com.alberto.zapardiel.tienda.service.crypto.CryptoService;
import com.alberto.zapardiel.tienda.utils.Utils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
public class UserServiceImpl implements UserService {

    /**
     * User repository
     */
    private UserRepository userRepository;

    /**
     * Crypto service
     */
    private CryptoService cryptoService;

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
        user.setEmail(user.getEmail().toLowerCase());
        user.setName(Utils.capitalize(user.getName()));
        user.setPass(cryptoService.encryptPass(user.getPass().trim().toUpperCase()));
        return userRepository.save(user);
    }

    /**
     * Method to get a user by id
     *
     * @param id the user id
     * @return the user
     */
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Method to update a user
     *
     * @param user the user
     * @return the user updated
     */
    @Override
    public User updateUser(User user) {
        User userUpdated = userRepository.findByDni(user.getDni().trim());
        if (Objects.nonNull(userUpdated)) {
            userUpdated.setName(Utils.capitalize(user.getName()));
            userUpdated.setLastName(user.getLastName());
            userUpdated.setRol(user.getRol());
            userUpdated.setDni(user.getDni());
            userUpdated.setPhone(user.getPhone());
            userUpdated.setEmail(user.getEmail().toLowerCase());
            userUpdated.setPass(cryptoService.encryptPass(user.getPass().trim().toUpperCase()));
            return userRepository.save(userUpdated);
        } else {
            return User.builder().id(-1).build();
        }
    }

    /**
     * Method to delete a user
     *
     * @param id the user id to delete
     */
    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Method to find a user by his name
     *
     * @param name the name
     * @return the user
     */
    public User findByName(String name) {
        return userRepository.findByName(Utils.capitalize(name));
    }

    /**
     * Method to find a user by his dni
     *
     * @param dni the dni
     * @return the user
     */
    public User findByDni(String dni) {
        return userRepository.findByDni(dni);
    }

    /**
     * Method to find the user, if exists, login him
     *
     * @param email the email
     * @param pass  the password
     * @return the user
     */
    public User findByEmailAndPass(String email, String pass) {
        List<User> users = userRepository.findByEmail(email.trim().toLowerCase());
        User u = new User();
        for(User user : users){
            if (user != null) {
                if (Boolean.TRUE.equals(cryptoService.matchPass(pass.trim().toUpperCase(), user.getPass()))) {
                    log.info("Match");
                    u= userRepository.findByEmailAndPass(email, user.getPass());
                    break;
                } else {
                    log.info("No match");
                }
            } else {
                log.info("Email not found");
                u = User.builder().id(-1).build();
            }
        }
        return u;
    }
}

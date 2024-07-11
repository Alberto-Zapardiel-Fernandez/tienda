package com.alberto.zapardiel.tienda.controller.user;

import com.alberto.zapardiel.tienda.dto.UserLoginDTO;
import com.alberto.zapardiel.tienda.model.User;
import com.alberto.zapardiel.tienda.service.user.UserService;
import com.alberto.zapardiel.tienda.utils.Utils;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * User controller
 * @author alberto zapardiel fernandez
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    /**
     * User service
     */
    private UserService userService;

    /**
     * End point to get the list of users
     * @return the list of users or a no content if is empty
     */
    @GetMapping(name = "getAllUsers", path = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    /**
     * End point to create a new User
     * @param user the user data
     * @return the user inserted or a message with the error
     */
    @PostMapping(name = "createUser", path = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createUser(@RequestBody User user){
        try {
            return ResponseEntity.ok(userService.createUser(user));
        } catch (Exception e) {
            String errorMessage = "Error creating user";
            if (e instanceof DataIntegrityViolationException) {
                errorMessage += ": Possible duplicate entry";
            }
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    /**
     * End point to get a user by his id
     * @param id the user id
     * @return the user
     */
    @GetMapping(name = "getUserById", path = "/user/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUserById(@PathVariable(name = "id") Long id){
        Optional<User> user = userService.getUserById(id);
        return user.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(user);
    }

    /**
     * End point to get a user by his name
     * @param name the name
     * @return the user
     */
    @GetMapping("/user/byName")
    public ResponseEntity<User> getUserByName(@RequestParam String name) {
        User user = userService.findByName(Utils.capitalize(name.trim()));
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * End point to get a user by his dni
     * @param dni the dni
     * @return the user
     */
    @GetMapping("/user/byDni")
    public ResponseEntity<User> getUserByDni(@RequestParam String dni) {
        User user = userService.findByDni(dni);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * End point to find the user, if exists, login him
     * @return the user
     */
    @PostMapping("/user/byEmailAndPass")
    public ResponseEntity<Integer> getUserByEmailAndPass(@RequestBody UserLoginDTO userLoginDTO) {
        User user = userService.findByEmailAndPass(userLoginDTO.getEmail(),userLoginDTO.getPass());
        if (user != null && user.getName()!=null) {
            return new ResponseEntity<>(1, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * End point to find the user, if exists, delete it
     * @param dni the dni
     * @return the user
     */
    @DeleteMapping("/user")
    public ResponseEntity<Integer> deleteByDni(@RequestParam String dni) {
        User user = userService.findByDni(dni.trim());
        if (user != null) {
            userService.deleteUserById(Long.parseLong(String.valueOf(user.getId())));
            return new ResponseEntity<>(1, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0,HttpStatus.OK);
        }
    }
    /**
     * End point to find the user, if exists, login him
     * @return the user
     */
    @PutMapping("/user")
    public ResponseEntity<Object> updateUser(@RequestBody User user, @RequestParam String dni) {
        try {
            return ResponseEntity.ok(userService.updateUser(user,dni));
        } catch (Exception e) {
            String errorMessage = "Error creating user";
            if (e instanceof DataIntegrityViolationException) {
                errorMessage += ": Possible duplicate entry";
            }
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}

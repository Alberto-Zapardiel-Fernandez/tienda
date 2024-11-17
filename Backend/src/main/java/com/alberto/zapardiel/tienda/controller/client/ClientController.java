package com.alberto.zapardiel.tienda.controller.client;

import com.alberto.zapardiel.tienda.model.Client;
import com.alberto.zapardiel.tienda.service.client.ClientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * Client controller
 * @author alberto zapardiel fernandez
 */
@RestController
@RequestMapping("/v1/api")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ClientController {

    /**
     * Client service
     */
    private ClientService clientService;

    /**
     * End point to get the list of clients
     * @return the list of clients or a no content if is empty
     */
    @GetMapping(name = "getAllClients", path = "/clients", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return clients.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(clients);
    }

    /**
     * End point to set a new client
     */
    @PostMapping(name = "createClient", path = "/client", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createClient(@RequestBody Client client){
        try {
            return ResponseEntity.ok(clientService.createClient(client));
        } catch (Exception e) {
            String errorMessage = "Error creating user";
            if (e instanceof DataIntegrityViolationException) {
                errorMessage += ": Possible duplicate entry";
            }
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    /**
     * End point to get a client by his id
     * @param id the client id
     * @return the client
     */
    @GetMapping(name = "getClientById", path = "/client",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getClientById(@RequestParam(name = "id") Long id){
        Optional<Client> client = clientService.getClientById(id);
        return client.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(client);
    }

    /**
     * End point to get a client by his name
     * @param name the name
     * @return the client
     */
    @GetMapping("/client/byName")
    public ResponseEntity<Client> getClientByName(@RequestParam String name) {
        Client client = clientService.findByName(name.trim());
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    /**
     * End point to get a client by his dni
     * @param dni the dni
     * @return the client
     */
    @GetMapping("/client/byDni")
    public ResponseEntity<Client> getClientByDni(@RequestParam String dni) {
        Client client = clientService.findByDni(dni);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * End point to find the client, if exists, delete it
     * @param id the id
     * @return the client
     */
    @DeleteMapping("/client")
    public ResponseEntity<Integer> deleteById(@RequestParam int id) {
        try {
            clientService.deleteClientById(id);
            return new ResponseEntity<>(1, HttpStatus.OK);
        } catch(Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(0,HttpStatus.OK);
        }
    }
    /**
     * End point to find the client, if exists, login him
     * @return the client
     */
    @PutMapping("/client")
    public ResponseEntity<Object> updateClient(@RequestBody Client client) {
        try {
            return ResponseEntity.ok(clientService.updateClient(client));
        } catch (Exception e) {
            String errorMessage = "Error creating client";
            if (e instanceof DataIntegrityViolationException) {
                errorMessage += ": Possible duplicate entry";
            }
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}

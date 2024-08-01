package com.alberto.zapardiel.tienda.service.client;

import com.alberto.zapardiel.tienda.model.Client;

import java.util.List;
import java.util.Optional;

/**
 * Client Service
 * @author Alberto Zapardiel Fernández
 */
public interface ClientService {

    /**
     * Method to get a list of clients
     * @return the list of clients
     */
    List<Client> getAllClients();

    /**
     * Method to set a new client
     * @param client the client
     * @return the client inserted
     */
    Object createClient(Client client);

    /**
     * Method to get a client by his id
     * @param id the id
     * @return the client
     */
    Optional<Client> getClientById(Long id);

    /**
     * Method to get a client by his name
     * @param name the name
     * @return the client if exist
     */
    Client findByName(String name);

    /**
     * Method to get the client by his dni
     * @param dni the dni
     * @return the client
     */
    Client findByDni(String dni);

    /**
     * Method to delete a client by his id
     * @param id the id
     */
    void deleteClientById(int id);

    /**
     * Method to update a client
     * @param client the client
     * @return the client updated
     */
    Object updateClient(Client client);
}

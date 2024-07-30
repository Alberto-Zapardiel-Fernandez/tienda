package com.alberto.zapardiel.tienda.repository;

import com.alberto.zapardiel.tienda.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Client Repository
 * @author Alberto Zapardiel Fernández
 */
@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {

    /**
     * Method to get a client by his name
     *
     * @param name the name
     * @return the client if exist
     */
    Client findByName(String name);

    /**
     * Method to get the client by his dni
     *
     * @param dni the dni
     * @return the client
     */
    Client findByDni(String dni);

    /**
     * Method to get a category by his id
     * @param id the id
     * @return the category
     */
    Client findById(int id);
}

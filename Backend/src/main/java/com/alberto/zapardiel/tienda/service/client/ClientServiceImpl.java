package com.alberto.zapardiel.tienda.service.client;

import com.alberto.zapardiel.tienda.model.Client;
import com.alberto.zapardiel.tienda.repository.ClientRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
 * Client service implementation
 *
 * @author Alberto Zapardiel Fernández
 */
@Service
@Slf4j
@AllArgsConstructor
public class ClientServiceImpl implements ClientService{

    /**
     * Client repository
     */
    private ClientRepository clientRepository;

    /**
     * Method to get a list of clients
     *
     * @return the list of clients
     */
    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    /**
     * Method to set a new client
     *
     * @param client the client
     * @return the client inserted
     */
    @Override
    public Object createClient(Client client) {
        return clientRepository.save(client);
    }

    /**
     * Method to get a client by his id
     *
     * @param id the id
     * @return the client
     */
    @Override
    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    /**
     * Method to get a client by his name
     *
     * @param name the name
     * @return the client if exist
     */
    @Override
    public Client findByName(String name) {
        return clientRepository.findByName(name);
    }

    /**
     * Method to get the client by his dni
     *
     * @param dni the dni
     * @return the client
     */
    @Override
    public Client findByDni(String dni) {
        return clientRepository.findByDni(dni);
    }

    /**
     * Method to delete a client by his id
     *
     * @param id the id
     * @throws ResponseStatusException if not found the client to delete
     */
    @Override
    public void deleteClientById(int id) throws ResponseStatusException{
        Client client = clientRepository.findById(id);
        if (client != null){
            clientRepository.deleteById((long) id);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Category not found");
        }
    }
    /**
     * Method to update a client
     *
     * @param client the client
     * @return the client updated
     */
    @Override
    public Object updateClient(Client client) {
        Client clientUpdated = clientRepository.findByDni(client.getDni());
        if (clientUpdated != null){
            clientUpdated.setDni(client.getDni() != null ? client.getDni() : null);
            clientUpdated.setName(client.getName() != null ? client.getName() : null);
            clientUpdated.setLastName(client.getLastName() != null ? client.getLastName() : null);
            clientUpdated.setPhone(client.getPhone() != null ? client.getPhone() : null);
            clientUpdated.setEmail(client.getEmail() != null ? client.getEmail() : null);
            clientUpdated.setAddress(client.getAddress() != null ? client.getAddress() : null);
            clientUpdated.setDiscount(client.getDiscount());
            return clientRepository.save(clientUpdated);
        }else{
            return Client.builder().id(-1).build();
        }
    }
}

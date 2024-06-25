package com.alberto.zapardiel.tienda.service;

import com.alberto.zapardiel.tienda.Connect;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Service
public class ConnectionService {

    private static Connect connection;

    public ConnectionService(Connect con){connection = con;}

    public static Connection getConnection(){
        try {
            return DriverManager.getConnection(connection.getDbUrl(), connection.getDbUsername(), connection.getDbPassword());
        } catch (SQLException e) {
            throw new IllegalArgumentException("Error connecting: "+e);
        }
    }
}

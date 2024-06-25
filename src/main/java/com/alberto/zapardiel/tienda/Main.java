package com.alberto.zapardiel.tienda;

import com.alberto.zapardiel.tienda.service.ConnectionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@SpringBootApplication
@Slf4j
public class Main {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(Main.class, args);
		Connection connection = ConnectionService.getConnection();
		Statement statement= connection.createStatement();
		ResultSet resultSet = statement.executeQuery("SELECT * FROM usuarios");
		if (resultSet.next()) {
			String nombre = resultSet.getString("nombre");
			log.info( nombre);
		}
	}

}

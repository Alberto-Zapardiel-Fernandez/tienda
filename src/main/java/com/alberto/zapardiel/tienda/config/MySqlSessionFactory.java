package com.alberto.zapardiel.tienda.config;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;

/**
 * My sql session factory
 * June 2024
 *
 * @author alberto Zapardiel Fernandez
 */
@Getter
@Slf4j
public class MySqlSessionFactory {

    private static MySqlSessionFactory instance;

    private SqlSessionFactory sessionFactory;

    /**
     * Method to set the mybatis configuration
     * @throws IOException the exception
     */
    public MySqlSessionFactory() throws IOException {
        String resource = "mybatis-config.xml";
        Reader reader ;

        try {
            reader = Resources.getResourceAsReader(resource);
            sessionFactory = new SqlSessionFactoryBuilder().build(reader);
            reader.close();
        }catch (Exception e){
            log.error(e.getMessage());
        }
    }

    /**
     * Method to get the instance
     * @return the session instance
     */
    public static MySqlSessionFactory getInstance() {
        if (instance == null){
            try {
                instance = new MySqlSessionFactory();
            } catch (IOException e) {
                log.error(e.getMessage());
            }
        }
        return instance;
    }

}

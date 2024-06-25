package com.alberto.zapardiel.tienda.service;

import com.alberto.zapardiel.tienda.config.MySqlSessionFactory;
import com.alberto.zapardiel.tienda.model.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * User Service Impl
 * June 2024
 *
 * @author alberto Zapardiel Fernández
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService{

    /**
     * The instance
     */
    static MySqlSessionFactory instance = MySqlSessionFactory.getInstance();
    static SqlSession session = null;

    /**
     * Method to get the Session
     * @return the session
     */
    private static SqlSession getSession() {
        try {
            session = instance.getSessionFactory().openSession();
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return session;
    }

    /**
     * Method to get a list of users
     *
     * @return the user's list
     */
    @Override
    public List<User> getUsers() {
        return getSession().selectList("getAllUsers");
    }
}

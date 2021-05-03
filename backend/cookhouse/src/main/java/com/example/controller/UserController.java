package com.example.controller;

import com.example.data.models.User;
import com.example.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // get all users
    @GetMapping("/users")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // get single user
    @GetMapping("/user/{id}")
    public Optional<User> getUser(@PathVariable Integer id) {
        return userRepository.findById(id);
    }

    // create user
    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        userRepository.save(user);
        return user;
    }
}

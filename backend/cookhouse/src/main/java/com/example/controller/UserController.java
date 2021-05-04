package com.example.controller;

import com.example.data.models.Error;
import com.example.data.models.User;
import com.example.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // get all users
    @GetMapping("/users")
    public ResponseEntity getAllUsers() {
        try {
            List<User> userList = (List<User>)userRepository.findAll();
            if (userList.isEmpty() || userList.size() == 0) {
                return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<List<User>>(userList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get single user
    @GetMapping("/user/{id}")
    public ResponseEntity getUser(@PathVariable Integer id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                return new ResponseEntity<User>(user.get(), HttpStatus.OK);
            }

            return new ResponseEntity<Error>(new Error(404, "user id not found: " + id),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // create user
    @PostMapping("/user")
    public ResponseEntity createUser(@Valid @RequestBody User user) {
        try {
            return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // delete user
    @DeleteMapping("/user/{id}")
    public ResponseEntity deleteUser(@PathVariable Integer id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                userRepository.delete(user.get());
                return new ResponseEntity<HttpStatus>(HttpStatus.OK);
            }

            return new ResponseEntity<Error>(new Error(404, "user id not found: " + id), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // update user
    @PutMapping("/user/{id}")
    public ResponseEntity updateUser (@PathVariable Integer id, @Valid @RequestBody User newUser) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                // update user
                return new ResponseEntity<User>(user.get(), HttpStatus.OK);
            }

            return new ResponseEntity<Error>(new Error(404, "user id not found: " + id), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

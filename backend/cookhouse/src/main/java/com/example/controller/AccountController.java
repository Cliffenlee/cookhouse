package com.example.controller;

import com.example.data.models.Error;
import com.example.data.models.User;
import com.example.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Optional;

@RestController
public class AccountController {

    @Autowired
    UserRepository userRepository;

    @CrossOrigin(origins = {"http://localhost:3000", "https://cook-house.netlify.app"})
    @PostMapping("/login")
    public ResponseEntity login (@RequestBody HashMap body) {

        try {
            String email = (String) body.get("email");
            String password = (String) body.get("password");

            Optional<User> user = userRepository.findByEmail(email);

            if (!user.isPresent()) {
                return new ResponseEntity<Error>(new Error(404, "User not found"), HttpStatus.OK);
            }

            if (password.equals(user.get().getPassword())) {
                return new ResponseEntity<User>(user.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Error>(new Error(500, "Wrong password"), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

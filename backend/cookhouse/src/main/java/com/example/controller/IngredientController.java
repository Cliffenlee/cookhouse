package com.example.controller;

import com.example.data.models.Ingredient;
import com.example.data.repositories.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IngredientController {
    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping("/ingredients")
    public Iterable<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }
}

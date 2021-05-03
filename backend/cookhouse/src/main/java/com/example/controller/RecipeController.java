package com.example.controller;

import com.example.data.models.Recipe;
import com.example.data.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/recipes")
    public Iterable<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
}

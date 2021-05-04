package com.example.controller;

import com.example.data.models.Error;
import com.example.data.models.Recipe;
import com.example.data.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class RecipeController {
    @Autowired
    private RecipeRepository recipeRepository;

    // get all recipes
    @GetMapping("/recipes")
    public ResponseEntity getAllRecipes() {
        try {
            List<Recipe> recipeList = (List<Recipe>) recipeRepository.findAll();
            if (recipeList.isEmpty() || recipeList.size() == 0) {
                return new ResponseEntity<List<Recipe>>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<List<Recipe>>(recipeList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get single recipe
    @GetMapping("/recipe/{id}")
    public ResponseEntity getRecipe(@PathVariable Integer id) {
        try {
            Optional<Recipe> recipe = recipeRepository.findById(id);
            if (recipe.isPresent()) {
                return new ResponseEntity<Recipe>(recipe.get(), HttpStatus.OK);
            }

            return new ResponseEntity<Error>(new Error(404, "recipe id not found: " + id), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // create recipe
    @PostMapping("/recipe")
    public ResponseEntity createRecipe(@Valid @RequestBody Recipe recipe) {
        try {
            return new ResponseEntity<Recipe>(recipeRepository.save(recipe), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error (500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

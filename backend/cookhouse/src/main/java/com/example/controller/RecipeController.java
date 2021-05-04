package com.example.controller;

import com.example.data.models.*;
import com.example.data.models.Error;
import com.example.data.repositories.IngredientRepository;
import com.example.data.repositories.NutritionRepository;
import com.example.data.repositories.RecipeRepository;
import com.example.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class RecipeController {
    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private NutritionRepository nutritionRepository;

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

//    // create recipe
//    @PostMapping("/recipe")
//    public ResponseEntity createRecipe(@Valid @RequestBody Recipe recipe) {
//        try {
//            return new ResponseEntity<Recipe>(recipeRepository.save(recipe), HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<Error>(new Error (500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping("/recipe")
    public ResponseEntity createRecipe (@RequestBody Recipe recipe) {
        try {
            Optional<User> user = userRepository.findById(recipe.getUser_id());
            System.out.println(recipe);
            List<Recipe> recipeList = user.get().getRecipes();
            recipeList.add(recipe);
            user.get().setRecipes(recipeList);
            System.out.println(recipe.getUser_id());
            System.out.println(user);
//            System.out.println(recipe.getUser_id());
//            System.out.println(recipe);
//            for (Ingredient ingredient: recipe.getIngredients()) {
//                Ingredient.CompositeKey ck = new Ingredient.CompositeKey();
//                ingredient.setCompositeKey(ck);
//            }
//
//            for (Ingredient ingredient: recipe.getIngredients()) {
//                Ingredient.CompositeKey ck = new Ingredient.CompositeKey();
//                ingredient.setCompositeKey(ck);
//            }
//
//            for (Ingredient ingredient: recipe.getIngredients()) {
//                Ingredient.CompositeKey ck = new Ingredient.CompositeKey();
//                ingredient.setCompositeKey(ck);
//            }
//
//            for (Ingredient ingredient: recipe.getIngredients()) {
//                Ingredient.CompositeKey ck = new Ingredient.CompositeKey();
//                ingredient.setCompositeKey(ck);
//            }
//            System.out.println(recipe);

            return new ResponseEntity(recipeRepository.save(recipe), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Error>(new Error (500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

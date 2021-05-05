package com.example.controller;

import com.example.data.models.*;
import com.example.data.models.Error;
import com.example.data.repositories.IngredientRepository;
import com.example.data.repositories.NutritionRepository;
import com.example.data.repositories.RecipeRepository;
import com.example.data.repositories.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
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
    public ResponseEntity createRecipe (@RequestBody HashMap body) {
        try {
            Recipe recipe = new Recipe();

            // add recipe to user
            recipe.setServing((Integer)body.get("serving"));
            recipe.setName((String)body.get("name"));
            Optional<User> user = userRepository.findById((Integer) body.get("user_id"));

            if (!user.isPresent()) {
                return new ResponseEntity<Error>(new Error(404, "user id not found: " + body.get("user_id")), HttpStatus.NOT_FOUND);
            }

            recipe.setUser(user.get());
            recipeRepository.save(recipe);
            List<Recipe> recipeList = user.get().getRecipes();
            recipeList.add(recipe);
            user.get().setRecipes(recipeList);

            // add nutrition to recipe
            Gson gson = new Gson();
            JsonElement jsonElement = gson.toJsonTree(body.get("nutrition"));
            Nutrition nutrition = gson.fromJson(jsonElement, Nutrition.class);
            nutrition.setRecipe(recipe);
            recipe.setNutrition(nutrition);
            nutritionRepository.save(nutrition);

            // add ingredients to recipe
            List<Ingredient> currentIngredientList = recipe.getIngredients();
            if (currentIngredientList == null) {
                currentIngredientList = new ArrayList<Ingredient>();
            }
            List<List<Object>> ingredientList = (List<List<Object>>) body.get("ingredients");
            for (Object object: ingredientList) {
                JsonElement ingredientElement = gson.toJsonTree(object);
                Ingredient ingredient = gson.fromJson(ingredientElement, Ingredient.class);
                ingredient.setRecipe(recipe);
                currentIngredientList.add(ingredient);
                recipe.setIngredients(currentIngredientList);
                Ingredient.CompositeKey ck = new Ingredient.CompositeKey();
                ck.setRecipe_id(recipe.getId());
                ingredient.setCompositeKey(ck);
                System.out.println(recipe);
                ingredientRepository.save(ingredient);
            }

            // add instructions to recipe
            List<Instruction> instructionList = (List<Instruction>) body.get("instructions");

            // add tools to recipoe
            List<Tool> toolList = (List<Tool>) body.get("tools");

            return new ResponseEntity(recipeRepository.save(recipe), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Error>(new Error (500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

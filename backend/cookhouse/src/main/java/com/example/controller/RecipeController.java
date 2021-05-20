package com.example.controller;

import com.example.data.models.*;
import com.example.data.models.Error;
import com.example.data.repositories.*;
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
    @Autowired
    private InstructionRepository instructionRepository;
    @Autowired
    private ToolRepository toolRepository;

    private Gson gson = new Gson();

    // get all recipes
    @CrossOrigin(origins = {"http://localhost:3000", "https://cook-house.netlify.app"})
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
    @CrossOrigin(origins = {"http://localhost:3000", "https://cook-house.netlify.app"})
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

    @CrossOrigin(origins = {"http://localhost:3000", "https://cook-house.netlify.app"})
    @PostMapping("/recipe")
    public ResponseEntity createRecipe (@RequestBody HashMap body) {
        try {
            System.out.println(body);
            Recipe recipe = new Recipe();

            // add recipe to user
            recipe.setServing((Integer)body.get("serving"));
            recipe.setName((String)body.get("name"));
            recipe.setImage_name((String)body.get("image_name"));
            Optional<User> user = userRepository.findById((Integer) body.get("user_id"));

            if (!user.isPresent()) {
                return new ResponseEntity<Error>(new Error(404, "user id not found: " + body.get("user_id")), HttpStatus.NOT_FOUND);
            }

            recipe.setUser_id(user.get().getId());
            recipeRepository.save(recipe);
            List<Recipe> recipeList = user.get().getRecipes();
            recipeList.add(recipe);
            user.get().setRecipes(recipeList);
            Integer recipe_id = recipe.getId();

            // add nutrition to recipe
            if (body.get("nutrition") != null) {
                JsonElement jsonElement = gson.toJsonTree(body.get("nutrition"));
                Nutrition nutrition = gson.fromJson(jsonElement, Nutrition.class);
                nutrition.setRecipe(recipe);
                recipe.setNutrition(nutrition);
                nutritionRepository.save(nutrition);
            }

            // add ingredients to recipe
            List<Ingredient> currentIngredientList =  new ArrayList<Ingredient>();
            List<Object> ingredientList = (List<Object>) body.get("ingredients") == null ? new ArrayList<Object>() : (List<Object>) body.get("ingredients");

            for (Object object: ingredientList) {
                JsonElement ingredientElement = gson.toJsonTree(object);
                Ingredient ingredient = gson.fromJson(ingredientElement, Ingredient.class);
                ingredient.setRecipe_id(recipe_id);
                currentIngredientList.add(ingredient);
                ingredientRepository.save(ingredient);
            }
            recipe.setIngredients(currentIngredientList);

            // add instructions to recipe
            List<Instruction> currentInstructionList = new ArrayList<Instruction>();
            List<Object> instructionList = (List<Object>) body.get("instructions") == null ? new ArrayList<Object>() : (List<Object>) body.get("instructions");;

            for (Object object: instructionList) {
                JsonElement instructionElement = gson.toJsonTree(object);
                Instruction instruction = gson.fromJson(instructionElement, Instruction.class);
                instruction.setRecipe_id(recipe_id);
                currentInstructionList.add(instruction);
                instructionRepository.save(instruction);
            }
            recipe.setInstructions(currentInstructionList);

            // add tools to recipe
            List<Tool> currentToolList = new ArrayList<Tool>();
            List<Object> toolList = (List<Object>) body.get("tools") == null ? new ArrayList<Object>() : (List<Object>) body.get("tools");

            for (Object object: toolList) {
                JsonElement toolElement = gson.toJsonTree(object);
                Tool tool = gson.fromJson(toolElement, Tool.class);
                tool.setRecipe_id(recipe_id);
                currentToolList.add(tool);
                toolRepository.save(tool);
            }

            recipe.setTools(currentToolList);

            return new ResponseEntity(recipeRepository.save(recipe), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Error>(new Error (500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = {"http://localhost:3000", "https://cook-house.netlify.app"})
    @PutMapping("/recipe")
    public ResponseEntity editRecipe (@RequestBody HashMap body) {
        try {
            System.out.println(body);
            Optional<Recipe> optionalRecipe = recipeRepository.findById((Integer) body.get("recipe_id"));

            if (!optionalRecipe.isPresent()) {
                return new ResponseEntity<Error>(new Error(404, "recipe id not found: " + body.get("recipe_id")), HttpStatus.NOT_FOUND);
            }

            Recipe recipe = optionalRecipe.get();

            // edit recipe attributes
            recipe.setServing((Integer)body.get("serving"));
            recipe.setName((String)body.get("name"));
            recipe.setImage_name((String)body.get("image_name"));


            // edit nutrition
            if (body.get("nutrition") != null) {
                JsonElement jsonElement = gson.toJsonTree(body.get("nutrition"));
                Nutrition nutrition = gson.fromJson(jsonElement, Nutrition.class);
                nutrition.setRecipe(recipe);
                recipe.setNutrition(nutrition);
                nutritionRepository.save(nutrition);
            }
            
            // delete all tools, ingredients and instructions from recipe
            recipe.getTools().clear();
            recipe.getIngredients().clear();
            recipe.getInstructions().clear();
            System.out.println("after clearing tools, ingredients and instructions");
            System.out.println(recipe);

            // add ingredients to recipe
            List<Object> ingredientList = (List<Object>) body.get("ingredients") == null ? new ArrayList<Object>() : (List<Object>) body.get("ingredients");

            for (Object object: ingredientList) {
                JsonElement ingredientElement = gson.toJsonTree(object);
                Ingredient ingredient = gson.fromJson(ingredientElement, Ingredient.class);
                ingredient.setRecipe_id(recipe.getId());
                recipe.getIngredients().add(ingredient);
                ingredientRepository.save(ingredient);
            }

            // add instructions to recipe
            List<Object> instructionList = (List<Object>) body.get("instructions") == null ? new ArrayList<Object>() : (List<Object>) body.get("instructions");;

            for (Object object: instructionList) {
                JsonElement instructionElement = gson.toJsonTree(object);
                Instruction instruction = gson.fromJson(instructionElement, Instruction.class);
                instruction.setRecipe_id(recipe.getId());
                recipe.getInstructions().add(instruction);
                instructionRepository.save(instruction);
            }

            // add tools to recipe
            List<Object> toolList = (List<Object>) body.get("tools") == null ? new ArrayList<Object>() : (List<Object>) body.get("tools");

            for (Object object: toolList) {
                JsonElement toolElement = gson.toJsonTree(object);
                Tool tool = gson.fromJson(toolElement, Tool.class);
                tool.setRecipe_id(recipe.getId());
                recipe.getTools().add(tool);
                toolRepository.save(tool);
            }
            
            return new ResponseEntity(recipeRepository.save(recipe), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Error>(new Error (500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

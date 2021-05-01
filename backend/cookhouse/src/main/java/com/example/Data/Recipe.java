package com.example.Data;

import java.util.ArrayList;

public class Recipe {
    private String id;
    private String name;
    private User author;
    private ArrayList<Ingredient> ingredients;
    private ArrayList<Tool> tools;
    private ArrayList<String> instructions;
    private Nutrition nutrition;
}

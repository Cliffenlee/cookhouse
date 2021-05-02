package com.example.data.models;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "nutrition")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private int serving;
    private ArrayList<Ingredient> ingredients;
    private ArrayList<Tool> tools;
    private ArrayList<Instruction> instructions;
    private Nutrition nutrition;
}

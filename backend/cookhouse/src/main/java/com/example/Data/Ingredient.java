package com.example.Data;

import lombok.Data;

public @Data class Ingredient {
    private int id;
    private String name;
    private Float quantity;
    private String measurement;
}

package com.example.data.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "nutrition")
public @Data class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private Float quantity;
    private String measurement;
}

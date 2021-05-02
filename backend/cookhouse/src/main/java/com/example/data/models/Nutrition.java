package com.example.data.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "nutrition")
public @Data class Nutrition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private Float calories;
    private Float protein;
    private Float carbohydrates;
    private Float fat;
    private Float cholesterol;
    private Float sodium;

}

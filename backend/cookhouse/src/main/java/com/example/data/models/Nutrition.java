package com.example.data.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "nutrition")
public @Data class Nutrition {
    @Id
    @Column(name="recipe_id")
    private Integer recipe_id;

    @OneToOne
    @JoinColumn(name="recipe_id", insertable = false, updatable = false)
    private Recipe recipe;

    private float calories;
    private float protein;
    private float carbohydrates;
    private float fat;
    private float cholesterol;
    private float sodium;
    private float sugar;
    private float fibre;

}

package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "nutrition")
public @Data class Nutrition {
    @Id
    @Column(name = "recipe_id")
    private Integer recipe_id;

    @JsonIgnore
    @MapsId
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="recipe_id")
    private Recipe recipe;

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
        this.recipe_id = recipe.getId();
    }

    public Recipe getRecipe() {
        return null;
    }

    @Override
    public String toString() {
        return "Nutrition{" +
                "recipe_id=" + recipe_id +
                ", calories=" + calories +
                ", protein=" + protein +
                ", carbohydrates=" + carbohydrates +
                ", fat=" + fat +
                ", cholesterol=" + cholesterol +
                ", sodium=" + sodium +
                ", sugar=" + sugar +
                ", fibre=" + fiber +
                '}';
    }

    private Float calories;
    private Float protein;
    private Float carbohydrates;
    private Float fat;
    private Float cholesterol;
    private Float sodium;
    private Float sugar;
    private Float fiber;

}

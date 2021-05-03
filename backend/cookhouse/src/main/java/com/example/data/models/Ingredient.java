package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "ingredient")
public @Data class Ingredient implements Serializable{

    @Data
    @Embeddable
    public static class CompositeKey implements Serializable {
        @Column(name="recipe_id")
        private Integer recipe_id;

        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

    private String ingredient_name;
    private String description;
}

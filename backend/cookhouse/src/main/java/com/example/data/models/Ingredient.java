package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;


@Entity
@Table(name = "ingredient")
public @Data class Ingredient {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "recipe_id")
    private Integer recipe_id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;

    private String ingredient_name;

    @NotNull
    @Size(min=1, max=300, message = "Description length must be between 1 and 300!")
    private String description;

    @Override
    public String toString() {
        return "Ingredient{" +
                "id=" + id +
                ", recipe_id=" + recipe_id +
                ", ingredient_name='" + ingredient_name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}

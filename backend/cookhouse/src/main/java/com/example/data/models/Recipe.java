package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "recipe")
public @Data class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Size(min=1, message = "Recipe serving size must be more than 0!")
    private Integer serving;

    @NotNull
    @Size(max=40, message = "Recipe name must be between 1 to 40 characters!")
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne (mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @PrimaryKeyJoinColumn
    private Nutrition nutrition;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "recipe")
    private List<Ingredient> ingredients;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "recipe")
    private List<Tool> tools;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "recipe")
    private List<Instruction> instructions;
}

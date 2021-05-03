package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "recipe")
public @Data class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private Integer serving;
    private String name;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    @OneToOne (cascade = CascadeType.ALL, orphanRemoval = true)
    @PrimaryKeyJoinColumn
//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private Nutrition nutrition;

//    @OneToMany (mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval =
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private List<Ingredient> ingredients;

//    @OneToMany (mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private List<Tool> tools;

//    @OneToMany (mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private List<Instruction> instructions;
}

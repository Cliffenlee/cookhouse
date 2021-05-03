package com.example.data.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "ingredient")
//@IdClass(IngredientPK.class)
public @Data class Ingredient implements Serializable{


    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    @Data
    @Embeddable
    public class CompositeKey implements Serializable {
        @Column(name="recipe_id")
        private Integer recipe_id;

        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Integer id;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

//    @Id
//    private Integer id;
//
//    @Id
//    private Integer recipe_id;

//    @Id
    @ManyToOne
    @JoinColumn(name = "recipe_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Recipe recipe;

    private String ingredient_name;
    private String description;
}

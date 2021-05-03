package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "instruction")
public @Data class Instruction implements Serializable {

    @Data
    @Embeddable
    public static class CompositeKey implements Serializable {
        @Column(name="recipe_id")
        private Integer recipe_id;

        @Column(name="step")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer step;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

    private String instruction;
}

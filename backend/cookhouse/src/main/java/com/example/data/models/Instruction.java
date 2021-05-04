package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "instruction")
public @Data class Instruction implements Serializable {

    @Data
    @Embeddable
    public static class CompositeKey implements Serializable {
        @Column(name="recipe_id", insertable = false, updatable = false)
        private Integer recipe_id;

        @Column(name="step")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer step;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

    @NotNull
    @Size(min=1, max=500, message = "Instruction length must be between 1 and 500!")
    private String instruction;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;
}

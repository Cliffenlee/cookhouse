package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "instruction")
public @Data class Instruction {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer instruction_id;

    @Column(name="step")
    private Integer step;

    @Column(name="recipe_id")
    private Integer recipe_id;

    @NotNull
    @Size(min=1, max=500, message = "Instruction length must be between 1 and 500!")
    private String instruction;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;


    @Override
    public String toString() {
        return "Instruction{" +
                "step=" + step +
                ", recipe_id=" + recipe_id +
                ", instruction='" + instruction + '\'' +
                '}';
    }
}

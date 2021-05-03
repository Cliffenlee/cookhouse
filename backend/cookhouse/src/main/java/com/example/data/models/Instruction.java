package com.example.data.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "instruction")
//@IdClass(InstructionPK.class)
public @Data class Instruction implements Serializable {


    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    @Data
    @Embeddable
    public class CompositeKey implements Serializable {
        @Column(name="recipe_id")
        private Integer recipe_id;

        @Column(name="step")
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Integer step;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

//    @Id
//    private Integer step;
//
//    @Id
//    private Integer recipe_id;

//    @Id
    @ManyToOne
    @JoinColumn(name = "recipe_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Recipe recipe;

    private String instruction;
}

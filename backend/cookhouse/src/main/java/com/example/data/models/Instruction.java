package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
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
        private Integer step;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

    @NotNull
    @Size(min=1, max=500, message = "Instruction length must be between 1 and 500!")
    private String instruction;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;

    @Override
    public String toString() {
        return "Instruction{" +
                "compositeKey=" + compositeKey +
                ", instruction='" + instruction + '\'' +
                '}';
    }
}

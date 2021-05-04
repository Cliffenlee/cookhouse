package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "tool")
public @Data class Tool implements Serializable {

    @Data
    @Embeddable
    public static class CompositeKey implements Serializable {
        @Column(name = "recipe_id", insertable = false, updatable = false)
        private Integer recipe_id;

        @NotNull
        @Size(min=1, max=40, message = "Tool name length must be between 1 and 40!")
        private String tool_name;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;

    @Override
    public String toString() {
        return "Tool{" +
                "compositeKey=" + compositeKey +
                '}';
    }
}

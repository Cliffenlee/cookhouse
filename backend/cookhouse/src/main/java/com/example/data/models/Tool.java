package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tool")
public @Data class Tool implements Serializable {

    @Data
    @Embeddable
    public static class CompositeKey implements Serializable {
        @Column(name = "recipe_id")
        private Integer recipe_id;

        private String tool_name;
    }

    @EmbeddedId
    private CompositeKey compositeKey;
}

package com.example.data.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tool")
//@IdClass(ToolPK.class)
public @Data class Tool implements Serializable {

    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    @Data
    @Embeddable
    public class CompositeKey implements Serializable {
        @Column(name = "recipe_id")
        private Integer recipe_id;

        @Column(name = "tool_name")
        private String tool_name;
    }

    @EmbeddedId
    private CompositeKey compositeKey;

//    @Id
//    private String tool_name;
//
//    @Id
//    private Integer recipe_id;

//    @Id
    @ManyToOne
    @JoinColumn(name = "recipe_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Recipe recipe;
}

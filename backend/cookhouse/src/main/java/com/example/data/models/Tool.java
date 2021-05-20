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

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tool_id;

    private String tool_name;

    @Column(name="recipe_id")
    private Integer recipe_id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;

    @Override
    public String toString() {
        return "Tool{" +
                "tool_id=" + tool_id +
                ", tool_name='" + tool_name + '\'' +
                ", recipe_id=" + recipe_id +
                '}';
    }
}

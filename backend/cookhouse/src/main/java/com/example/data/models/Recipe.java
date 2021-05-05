package com.example.data.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.List;

@Entity
@Table(name = "recipe")
public @Data class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Min(value=1, message = "Recipe serving size must be more than 0!")
    private Integer serving;

    @NotNull
    @Size(max=40, message = "Recipe name must be between 1 to 40 characters!")
    private String name;

    @Column(name="user_id")
    private int user_id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @OneToOne (mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @PrimaryKeyJoinColumn
    private Nutrition nutrition;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "recipe")
    private List<Ingredient> ingredients;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "recipe")
    private List<Tool> tools;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "recipe")
    private List<Instruction> instructions;

    public void setUser(User user) {
        this.user = user;
        this.user_id = user.getId();
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", serving=" + serving +
                ", name='" + name + '\'' +
                ", user_id=" + user_id +
                ", nutrition=" + nutrition +
                ", ingredients=" + ingredients +
                ", tools=" + tools +
                ", instructions=" + instructions +
                '}';
    }
}

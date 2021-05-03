package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public @Data class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;

//    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Recipe> recipes;
}

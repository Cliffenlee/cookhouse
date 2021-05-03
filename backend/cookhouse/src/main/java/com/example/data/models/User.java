package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="users")
public @Data class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "User's name cannot be null!")
    @Size(min = 1, message = "User's name length must be more than 0!")
    private String name;

    @Email(message = "Invalid user email format")
    @NotNull(message = "User's email cannot be null!")
    @Size(min=1, message = "User's email length must be more than 0!")
    @Column(unique = true)
    private String email;

//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    private List<Recipe> recipes;
}

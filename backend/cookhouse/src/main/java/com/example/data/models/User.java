package com.example.data.models;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name="users")
public @Data class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String email;
    private ArrayList<Recipe> recipes;
}

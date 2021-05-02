package com.example.data.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "nutrition")
public @Data class Instruction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int step;
    private String instruction;
}

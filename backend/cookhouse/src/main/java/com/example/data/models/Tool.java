package com.example.data.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "nutrition")
public @Data class Tool {
    private String name;
}

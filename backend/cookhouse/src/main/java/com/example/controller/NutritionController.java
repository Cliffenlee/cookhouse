package com.example.controller;

import com.example.data.models.Nutrition;
import com.example.data.repositories.NutritionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NutritionController {
    @Autowired
    private NutritionRepository nutritionRepository;

    @GetMapping("/nutrition")
    public Iterable<Nutrition> getAllNutrition() {
        return nutritionRepository.findAll();
    }
}

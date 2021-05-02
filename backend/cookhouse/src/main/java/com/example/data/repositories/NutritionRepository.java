package com.example.data.repositories;

import com.example.data.models.Nutrition;
import org.springframework.data.repository.CrudRepository;

public interface NutritionRepository extends CrudRepository<Nutrition, Integer> {
}

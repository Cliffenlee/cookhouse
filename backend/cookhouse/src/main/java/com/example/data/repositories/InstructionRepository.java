package com.example.data.repositories;

import com.example.data.models.Instruction;
import org.springframework.data.repository.CrudRepository;

public interface InstructionRepository extends CrudRepository<Instruction, Integer> {
}

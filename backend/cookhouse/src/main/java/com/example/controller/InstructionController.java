package com.example.controller;

import com.example.data.models.Instruction;
import com.example.data.repositories.InstructionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InstructionController {
    @Autowired
    private InstructionRepository instructionRepository;

    @GetMapping("/instructions")
    public Iterable<Instruction> getAllInstructions() {
        return instructionRepository.findAll();
    }
}

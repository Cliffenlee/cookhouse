package com.example.controller;

import com.example.data.models.Tool;
import com.example.data.repositories.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ToolController {
    @Autowired
    private ToolRepository toolRepository;

    @GetMapping("/tools")
    private Iterable<Tool> getAllTools() {
        return toolRepository.findAll();
    }
}

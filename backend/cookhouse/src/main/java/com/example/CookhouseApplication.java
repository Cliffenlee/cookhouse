package com.example;

import com.example.controller.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ComponentScan(basePackageClasses = UserController.class)
public class CookhouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(CookhouseApplication.class, args);
	}

}

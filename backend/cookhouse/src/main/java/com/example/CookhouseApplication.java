package com.example;

import com.example.controller.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackageClasses = UserController.class)
public class CookhouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(CookhouseApplication.class, args);
	}

}

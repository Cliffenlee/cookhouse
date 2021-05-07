SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
SET time_zone = "+08:00";

drop schema if exists cookhouse;
CREATE schema cookhouse DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE cookhouse;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  	id int auto_increment NOT NULL,
	name VARCHAR(40) NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
  	PRIMARY KEY (id)
);

INSERT INTO users (name, email) VALUES
("Patrick", "tricksterpatrick@gmail.com"),
("Mariah", "mariahnotcarey@gmail.com"),
("Hummington92", "twittingbird@gmail.com");


DROP TABLE IF EXISTS recipe;
CREATE TABLE IF NOT EXISTS recipe (
  	id int auto_increment NOT NULL,
  	user_id int NOT NULL,
	name VARCHAR(40) NOT NULL,
	serving int NOT NULL,
	image_name VARCHAR(40),
  	PRIMARY KEY (id),
  	FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO recipe (user_id, name, serving, image_name) VALUES
("1", "Egg tarts from the heart", "16", "eggtart.jpg"),
("1", "Steak that will sway vegans", "2", "steak.jpg"),
("2", "Brownies that take away the frownies", "16", "brownie.jpg"),
("3", "Fish that make you go SHEESH", "1", "salmon.jpg");

DROP TABLE IF EXISTS instruction;
CREATE TABLE IF NOT EXISTS instruction (
	id int auto_increment NOT NULL,
  	step int NOT NULL,
  	recipe_id int NOT NULL,
	instruction VARCHAR(500) NOT NULL,
  	PRIMARY KEY (id),
  	FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);


INSERT INTO instruction (recipe_id, step, instruction) VALUES
("1", "1", "For the pastry, in a large bowl, sift flour, sugar, and salt. Then add softened butter. Bring the mixture together with your hands, careful not to knead the pastry dough too much or you will make the pastry tough."),
("1", "2", "Whisk the egg yolks and add the 2 tablespoons of beaten yolk to the flour mixture. Bring together until smooth. If the dough is too sticky, coating your hands with flour will help. Cover with plastic wrap and then refrigerate for 30 minutes, or until the dough is firm."),
("1", "3", "To make the custard filling, melt sugar and salt with hot water. Mix until dissolved then let cool."),
("1", "4", "Add the rest of the beaten egg yolk. Stir in sugar water and also evaporated milk (if adding vanilla, add now). Stir and combine everything well."),
("1", "5", "Strain the filling to ensure no lumps. Chill in the refrigerator."),
("1", "6", "Preheat the oven to 400˚F (200˚C.)"),
("1", "7", "Take the dough out and divide into 16 equal portions. Spray the tart pan with a light coating of oil. Take one portion of your dough and roll it into a ball and place in your tart shell. Press the shell into the pan with your fingers. Try to make the wrapper uniform in thickness and avoid a thick bottom. Repeat to finish all."),
("1", "8", "Pour the custard filling into the shells until it is about 80% full. Bake for 15 to 20 minutes until the surface becomes golden brown and a toothpick can stand in the egg tart."),
("1", "9", "Cool down for several minutes and then take the egg tarts out of the pan. Serve while still warm."),
("1", "10", "Enjoy!"),
("2", "1", "Preheat oven to 200°F (95°C)."),
("2", "2", "Generously season all sides of the steak with salt and pepper."),
("2", "3", "Transfer to a wire rack on top of a baking sheet, then bake for about 45 minutes to an hour until the internal temperature reads about 125°F (51° C) for medium-rare. Adjust the bake time based on if you like your steak more rare or more well-done (you monster)."),
("2", "4", "Heat the canola oil in a pan over high heat until smoking. Do not use olive oil, as its smoke point is significantly lower than that of canola oil and will smoke before reaching the desired cooking temperature."),
("2", "5", "Sear the steak for 30 seconds on the first side, then flip."),
("2", "6", "Add the butter, garlic, rosemary, and thyme and swirl around the pan."),
("2", "7", "Transfer the garlic and herbs on top of the steak and baste the steak with the butter using a large spoon."),
("2", "8", "Baste for about 30 seconds, then flip and baste the other side for about 15 seconds."),
("2", "9", "Turn the steak on its side and cook to render off any excess fat."),
("2", "10", "Rest the steak on a cutting board or wire rack for about 10 minutes. Slicing the steak before the resting period has finished will result in a lot of the juices leaking out, which may not be desirable."),
("2", "11", "Slice the steak into ½ -inch (1 cm) strips, then fan out the slices and serve."),
("2", "12", "Enjoy!"),
("3", "1", "Preheat the oven to 350˚F (180˚C)."),
("3", "2", "Add the butter and 1 cup (175 g) of chocolate chips to a large microwave-safe bowl. Microwave for 1½ minutes, then let sit for 3 minutes before whisking together."),
("3", "3", "Add the granulated and brown sugars, vanilla, and salt. Whisk to combine."),
("3", "4", "Whisk in the eggs until fully combined."),
("3", "5", "Sift the flour and cocoa powder into the bowl and fold in with a spatula. Add the remaining chocolate chips and fold to incorporate."),
("3", "6", "Line a 9-inch (23-cm) square baking pan with parchment paper and grease with nonstick spray. Spread the batter evenly in the pan."),
("3", "7", "Bake for 35-40 minutes, until a toothpick inserted in the center comes out with a few moist crumbs attached."),
("3", "8", "Let cool completely before cutting."),
("3", "9", "Enjoy!"),
("4", "1", "Place salmon in a sealable bag or medium bowl."),
("4", "2", "In a small bowl or measuring cup, mix marinade ingredients."),
("4", "3", "Pour half of the marinade on the salmon. Save the other half for later."),
("4", "4", "Let the salmon marinate in the refrigerator for at least 30 minutes."),
("4", "5", "In a medium pan, heat oil. Add salmon to the pan, but discard the used marinade. Cook salmon on one side for about 2-3 minutes, then flip over and cook for an additional 1-2 minutes."),
("4", "6", "Remove salmon from pan. Pour in remaining marinade and reduce."),
("4", "7", "Serve the salmon with sauce and a side of veggies. We used broccoli."),
("4", "8", "Enjoy!");

DROP TABLE IF EXISTS ingredient;
CREATE TABLE IF NOT EXISTS ingredient (
	id int auto_increment NOT NULL,
  	recipe_id int NOT NULL,
	ingredient_name VARCHAR(200),
	description VARCHAR(300) NOT NULL,
  	PRIMARY KEY (id),
  	FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);


INSERT INTO ingredient (ingredient_name, recipe_id, description) VALUES
("custard filling","1", "4 eggs, beaten, reserve 2 tablespoons for your pastry dough"),
("custard filling","1", "¾ cup water (180 mL), hot"),
("custard filling","1", "6 tablespoons sugar"),
("custard filling","1", "⅛ teaspoon salt, pinch"),
("custard filling","1", "¼ cup evaporated milk (60 mL)"),
("custard filling","1", "vanilla extract, a dash, optional"),
("pastry dough", "1", "2 cups cake flour (200 g), plus extra for dusting"),
("pastry dough", "1", "115 g unsalted butter (115 g), room temperature"),
("pastry dough", "1", "¼ cup powdered sugar (40 g)"),
("pastry dough", "1", "2 tablespoons egg, beaten"),
("pastry dough", "1", "⅛ teaspoon salt"),
("pastry dough", "1", "vanilla extract, a dash, optional"),
(null, "2", "1 ribeye steak, 2 inch (5 cm) thick, preferably USDA Prime"),
(null, "2", "salt, to taste"),
(null, "2", "pepper, to taste"),
(null, "2", "3 tablespoons canola oil"),
(null, "2", "3 tablespoons butter"),
(null, "2", "3 cloves garlic, peeled and smashed"),
(null, "2", "2 sprigs fresh rosemary"),
(null, "2", "3 sprigs fresh thymev"),
(null, "3", "1 cup unsalted butter (230 g), 2 sticks"),
(null, "3", "1 ½ cups semi-sweet chocolate chips (260 g), or dark chocolate chips, divided"),
(null, "3", "1 ½ cups granulated sugar (300 g)"),
(null, "3", "¾ cup brown sugar (165 g)"),
(null, "3", "1 tablespoon vanilla extract"),
(null, "3", "1 teaspoon salt"),
(null, "3", "3 large eggs"),
(null, "3", "1 ¼ cups all-purpose flour (155 g)"),
(null, "3", "⅓ cup dark cocoa powder (40 g)"),
(null, "3", "nonstick cooking spray, for greasing"),
(null, "4","12 oz skinless salmon (340 g)"),
(null, "4","1 tablespoon olive oil");

DROP TABLE IF EXISTS tool;
CREATE TABLE IF NOT EXISTS tool (
	id int auto_increment NOT NULL,
	tool_name VARCHAR(50) NOT NULL,
  	recipe_id int NOT NULL,
  	PRIMARY KEY (id),
  	FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);


INSERT INTO tool (recipe_id, tool_name) VALUES
("1", "oven"),
("2", "oven"),
("2", "pan"),
("2", "cutting board"),
("3", "oven"),
("3", "parchment paper"),
("3", "baking pan"),
("4", "fridge"),
("4", "pan");

DROP TABLE IF EXISTS nutrition;
CREATE TABLE IF NOT EXISTS nutrition (
  	recipe_id int NOT NULL,
	calories float DEFAULT 0,
	protein float DEFAULT 0,
	carbohydrates float DEFAULT 0,
	fat float DEFAULT 0,
	cholesterol float DEFAULT 0,
	sodium float DEFAULT 0,
	sugar float DEFAULT 0,
	fiber float DEFAULT 0,
  	PRIMARY KEY (recipe_id),
  	FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);


INSERT INTO nutrition (recipe_id, calories, fat, carbohydrates, fiber, sugar, protein) VALUES
(1, 119, 2, 20, 0, 6, 4),
(2, 575, 54, 2, 1, 0, 21),
(3, 272, 16, 28, 1, 19, 3),
(4, 705, 35, 60, 0, 57, 37);
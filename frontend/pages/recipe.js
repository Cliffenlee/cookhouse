import { Box, Flex } from '@chakra-ui/layout'
import React, { useState } from 'react'
import Recipe from '../components/Recipe/recipe'

export default function recipe() {
    const [recipes, setRecipes] = useState([
        {
            "id": 1,
            "author": "Timothy",
            "name": "egg tarts from the heart",
            "ingredients": [
                {
                    "name": "egg",
                    "quantity": 2,
                    "measurement": "pieces"
                },
                {
                    "name": "flour",
                    "quantity": 3,
                    "measurement": "cups"
                },
            ],
            "tools": [
                {
                "name": "oven"
                }
            ],
            "instructions": [
                "make the egg tart",
                "put it in the oven"
            ],
            "nutrition": {
                "calories": "350",
                "protein": "20g",
                "carbohydrates": "310g",
                "fat": "50g",
                "cholesterol": "200mg",
                "sodium": "100mg"
            }
        },
        {
            "id": 2,
            "author": "Sarah",
            "name": "Steak that will sway vegans",
            "ingredients": [
                {
                "name": "beef",
                "quantity": 350,
                "measurement": "g"
                },
                {
                    "name": "salt",
                    "quantity": 5,
                    "measurement": "teaspoons"
                },
                {
                    "name": "pepper",
                    "quantity": 3,
                    "measurement": "teaspoons"
                },
                {
                    "name": "paprika",
                    "quantity": 2,
                    "measurement": "tablespoons"
                },
            ],
            "tools": [
                {
                "name": "microwave"
                },
                {
                    "name": "frying pan"
                }
            ],
            "instructions": [
                "make the egg tart",
                "put it in the oven"
            ],
            "nutrition": {
                "calories": "800",
                "protein": "50g",
                "carbohydrates": "530g",
                "fat": "30g",
                "cholesterol": "250mg",
                "sodium": "220mg"
            }
        }
    ])

    return (
        <Flex paddingX="20" paddingY="10" height="93vh" flexDirection="column">
            <Box marginBottom="10">
                <a className="big-medium">Your Recipes</a>
            </Box>
            <Flex>
                {recipes.map(recipe => {
                    return <Recipe key={recipe.id} recipe={recipe} />
                })}
            </Flex>

        </Flex>
    )
}

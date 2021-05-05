import { Box, Flex, Tag } from '@chakra-ui/react'
import React from 'react'

export default function recipe({recipe}) {
    const tools = recipe.tools
    const ingredients = recipe.ingredients
    const temp = recipe.ingredients.map(ingredient => {
        return ingredient.name
    })
    console.log(temp)
    return (
        <Flex flexDirection="column" marginRight="100">
            <a className="mid-medium">{recipe.name.toUpperCase()}</a>
            <Box>
                <a>ingredients: </a>
                    {ingredients.map(ingredient=> {
                        return <Tag key={ingredient.name} marginRight="1">{ingredient.name}</Tag>
                    })}
            </Box>
            <Box>
                <a>tools: </a>
                {tools.map(tool => {
                    return <Tag key={tool.name} marginRight="1">{tool.name}</Tag>
                })}
            </Box>

        </Flex>
    )
}

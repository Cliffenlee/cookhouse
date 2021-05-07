import React from 'react'
import {Box, Flex, Heading, Image, ListItem, Tag, Text, UnorderedList} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export default function Back({recipe, selector}) {
    console.log(recipe.image_name)
    return (
        <Box className="back">
            <Image height="50%" src={"/assets/"+recipe.image_name} alt={recipe.name}></Image>
            <Flex height="50%" p={8} flexDirection="column" alignItems="center">
                <Heading width="100%" px={4} textAlign="start" mb={4}>
                    Ingredients
                </Heading>
                <Flex p={2} overflowY="scroll" overflowX="hidden" flexDirection="column" alignItems="center">
                    <Box>
                        <UnorderedList>
                        {recipe.ingredients.map((ingredient, index) => {
                            return (
                            <ListItem key={index}>
                                {ingredient.description}
                            </ListItem>
                            )
                        })}
                        </UnorderedList>
                    </Box>

                </Flex>
                <Flex width="100%" justifyContent="start" alignItems="center" mt={4} px={4}>
                    <Box>
                        <Heading size="md">
                            Tools needed:
                        </Heading>
                    </Box>

                    {recipe.tools.map((tool, index) => {
                        return (
                            <Tag key={index} colorScheme="green" mx={2}>{tool.tool_name}</Tag>
                        )
                    })}
                </Flex>
            </Flex>
            <label className="back-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowBackIcon/>
                </Tag>
            </label>
        </Box>
    )
}

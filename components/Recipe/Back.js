import React from 'react'
import {Box, Flex, Heading, Image, ListItem, Tag, Text, UnorderedList} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export default function Back({toHomePage, recipe, selector}) {
    const imageLink = `https://cookhouse-images.s3-ap-southeast-1.amazonaws.com/${recipe.user_id}/${recipe.image_name}`
    const bookmark = selector == "c0" ? <div onClick={toHomePage} className="bookmark-back">Return to front</div> : ""
    return (
        <Box className="back">
            <Image height="50%" maxWidth="100%" src={imageLink} alt={recipe.name}></Image>
            <Flex height="50%" p={8} flexDirection="column" alignItems="start">
                <Flex height="80%" flexDirection="column">
                    <Heading width="100%" px={4} textAlign="start" mb={4}>
                        Ingredients
                    </Heading>
                    <Flex py={2} px={4} overflowY="scroll" overflowX="hidden" flexDirection="column">
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
                </Flex>
                <Flex width="100%" height="20%" mt={2} padding={2} justifyContent="start" alignItems="center" overflowX="auto" overflowY="hidden">
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
            {bookmark}
            <label className="back-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowBackIcon/>
                </Tag>
            </label>
        </Box>
    )
}

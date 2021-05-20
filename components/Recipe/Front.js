import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ArrowForwardIcon, EditIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/popover'
import { Tag } from '@chakra-ui/tag'
import React from 'react'
import EditRecipe from './EditRecipe'

export default function Front({recipe, selector}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    recipe.instructions.sort(function(a,b) {return a.step - b.step})

    return (
        <Flex position="relative" flexDirection="column" overflowY="scroll" overflowX="hidden" className="front" padding={8}>
            <Heading textTransform="uppercase" mb={8}>{recipe.name} <EditIcon color="gray.500" onClick={onOpen} cursor="pointer" _hover={{color: "gray.600"}}/></Heading>
            <Flex alignItems="center" justifyContent="space-between" pr={5}>
                <Heading size="m">
                    Serving size: {recipe.serving}
                </Heading>
                <Flex flexDirection="column" alignItems="center" justifyContent="center">
                    <Popover arrowShadowColor="blue.500" arrowSize="12" placement="bottom-start" trigger="click">
                        <PopoverTrigger>
                            <Box position="relative">
                                <Text mb={2} as="u" cursor="pointer" color="blue.400">
                                    Nutrition
                                </Text>
                                <InfoIcon position="absolute" ml={1} top="50%" transform="translateY(-50%);" color="blue.400"/>
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow/>
                            <PopoverCloseButton/>
                                <PopoverHeader>
                                    <Heading size="s">
                                        Nutrition
                                    </Heading>
                                </PopoverHeader>
                                <PopoverBody>
                                    <Flex mt={2}>
                                        <Flex mr={4} flexDirection="column" alignItems="center" justifyContent="center">
                                            <Box>
                                                <Text mb={2}>
                                                    Calories: {recipe.nutrition.calories}kcals
                                                </Text>
                                                <Text mb={2}>
                                                    Carbohydrates: {recipe.nutrition.carbohydrates}g
                                                </Text>
                                                <Text mb={2}>
                                                    Cholesterol: {recipe.nutrition.cholesterol}mg
                                                </Text>
                                                <Text mb={2}>
                                                    Fat: {recipe.nutrition.fat}g
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Flex flexDirection="column" alignItems="center" justifyContent="center">
                                            <Box>
                                                <Text mb={2}>
                                                    Fibre: {recipe.nutrition.fiber}g
                                                </Text>
                                                <Text mb={2}>
                                                    Protein: {recipe.nutrition.protein}g
                                                </Text>
                                                <Text mb={2}>
                                                    Sodium: {recipe.nutrition.sodium}g
                                                </Text>
                                                <Text mb={2}>
                                                    Sugar: {recipe.nutrition.sugar}mg
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Flex>
            {recipe.instructions.map((instruction, instructionIndex) => {
                return (
                <Box key={instructionIndex} position="relative" borderWidth="2px" borderColor="gray.300" padding={5} borderRadius="lg" my="4">
                    <Tag colorScheme="messenger" position="absolute" left="0" top="0" transform="translateX(-50%) translateY(-50%)" borderRadius="full">{instructionIndex+1}</Tag>
                    <Text mb={2} lineHeight="1.2" fontSize="md">{instruction.instruction}</Text>
                </Box>
                )
            })}
            <label className="next-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowForwardIcon/>
                </Tag>
            </label>
            <EditRecipe isOpen={isOpen} onClose={onClose} recipe={recipe}/>
        </Flex>
    )
}

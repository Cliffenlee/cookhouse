import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon, CheckCircleIcon, CloseIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/input'
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Tag } from '@chakra-ui/tag'
import { Textarea } from '@chakra-ui/textarea'
import React, { createRef, useState } from 'react'

export default function CoverPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // state
    const [ingredients, setIngredients] = useState([])
    const [tools, setTools] = useState([])
    const [instructions, setInstructions] = useState([])

    // ref
    const recipeNameRef = React.createRef()
    const ingredientRef = React.createRef()
    const toolRef = React.createRef()
    const instructionRef = React.createRef()

    function addTool (event) {
        if (event.key == 'Enter') {
            if (toolRef.current.value.trim() == "") {
                return
            }
            if (tools.includes(toolRef.current.value)) {
                console.log("repeated")
                // insert error message
                return
            }
            setTools([...tools, toolRef.current.value])
            toolRef.current.value = ""
        }
    }

    function removeTool (index) {
        const newTools = [...tools]
        index !== -1 ? newTools.splice(index,1) : ""
        tools == undefined || tools.length <= 0 ? setTools([]) :setTools(newTools)
    }

    function addInstruction (event) {
        if (event.key == 'Enter') {
            event.preventDefault()
            if (instructionRef.current.value.trim() == "") {
                return
            }
            const newInstruction = instructionRef.current.value.trim()
            setInstructions([...instructions, newInstruction])
            instructionRef.current.value = ""
        }
    }

    function removeInstruction (index) {
        const newInstructions = [...instructions]
        index !== -1 ? newInstructions.splice(index,1) : ""
        instructions == undefined || instructions.length <= 0 ? setInstructions([]) : setInstructions(newInstructions)
    }

    function addIngredient (event) {
        if (event.key == 'Enter') {
            if (ingredientRef.current.value.trim() == "") {
                return
            }
            const newIngredient = ingredientRef.current.value.trim()
            setIngredients([...ingredients, newIngredient])
            ingredientRef.current.value = ""
        }
    }

    function removeIngredient (index) {
        const newIngredients = [...ingredients]
        index !== -1 ? newIngredients.splice(index,1) : ""
        ingredients == undefined || ingredients.length <= 0? setIngredients([]) : setIngredients(newIngredients)
    }

    return (
        <Flex justifyContent="space-around" alignItems="center" id="cover" p={8}>
            <Flex onClick={onOpen} cursor="pointer" _hover={{background: "blue.300"}} transition="0.2s" borderRadius="2xl" height="40%" width="40%" background="blue.200" flexDirection="column" justifyContent="center" alignItems="center" >
                <AddIcon fontSize="4vh" mb={5}/>
                <Text textAlign="center" fontSize="2vh">
                    Create a recipe
                </Text>
            </Flex>
            <Flex cursor="pointer" _hover={{background: "blue.300"}} transition="0.2s" borderRadius="2xl" height="40%" width="40%" background="blue.200" flexDirection="column" justifyContent="center" alignItems="center" >
                <EditIcon fontSize="4vh" mb={5}/>
                <Text textAlign="center" fontSize="2vh">
                    Edit a recipe
                </Text>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxWidth="40vw" height="80vh">
                <ModalHeader textAlign="center" fontSize="2rem">
                    New Recipe
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflow="scroll" justifyContent="center" px="3vw">
                    <Input variant="flushed" size="lg" ref={recipeNameRef} isRequired={true} placeholder="Recipe Name"/>
                    <Box mb="3vh">
                        {/* <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                            Recipe Name
                        </Text> */}
                    </Box>
                    <Box mb="3vh">
                        <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                            Ingredients
                        </Text>
                        <Input ref={ingredientRef} placeholder="Ingredients" onKeyDown={addIngredient}/>
                        {ingredients && ingredients.length > 0 ? (
                            <List mt={4} spacing={3}>
                                {ingredients.map((ingredients, index) => {
                                    return (
                                        <Flex key={index} alignItems="center">
                                            <ListIcon as={SmallCloseIcon} color="red.300" cursor="pointer" onClick={() => removeIngredient(index)}/>
                                            <ListItem key={index}>
                                                {ingredients}
                                            </ListItem>
                                        </Flex>
                                    )
                                }
                            )}
                            </List>
                        ): ""}
                    </Box>
                    <Box mb="3vh">
                        <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                            Tools
                        </Text>
                        <Input placeholder="Tools" onKeyDown={addTool} ref={toolRef} />
                        <Box mt={2}>
                            {tools.map((tool, index) => {
                                return <Tag colorScheme="green" key={index} py={2} mr={2} cursor="pointer" onClick={() => removeTool(index)}>{tool}<CloseIcon ml={2} fontSize="0.5rem"/></Tag>
                            })}
                        </Box>
                    </Box>
                    <Box mb="3vh" width="30%">
                        <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                            Nutrition
                        </Text>
                        <Flex flexDirection="column">
                            <InputGroup>
                                <Input type="number"placeholder="Calories"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="kcal"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Protein"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="g"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Carbohydrates"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="g"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Fat"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="g"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Cholesterol"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="mg"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Sodium"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="g"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Sugar"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="mg"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input type="number"placeholder="Fibre"/>
                                <InputRightAddon
                                    width = "25%"
                                    justifyContent="center"
                                    pointerEvents="none"
                                    children="g"
                                />
                            </InputGroup>
                        </Flex>
                    </Box>
                    <Box mb="3vh">
                        <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                            Instructions
                        </Text>
                        {instructions.map((instruction, index) => {
                            return(
                                <Box key={index} position="relative" width="100%" minHeight="8vh" mb={4} borderRadius={10} padding={4} background="blue.100">
                                    <Tag borderRadius="full" colorScheme="gray" zIndex="99" position="absolute" top="0" left="0" transform="translateX(-50%) translateY(-50%)">{index+1}</Tag>
                                    <Box zIndex="99" position="absolute" top="0" right={2}><CloseIcon fontSize="0.6rem" cursor="pointer" onClick={() => {removeInstruction(index)}}/></Box>
                                    {instruction}
                                </Box>)
                        })}
                        <Box position="relative">
                            <Textarea ref={instructionRef} onKeyDown={addInstruction} resize="none" placeholder="Instructions"/>
                            <Tag borderRadius="full" colorScheme="gray" zIndex="99" position="absolute" top="0" left="0" transform="translateX(-50%) translateY(-50%)">{instructions.length + 1}</Tag>
                        </Box>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button colorScheme="blue">Create</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

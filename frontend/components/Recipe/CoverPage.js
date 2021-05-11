import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Tag } from '@chakra-ui/tag'
import { Textarea } from '@chakra-ui/textarea'
import React, { createRef, useState } from 'react'

export default function CoverPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ingredients, setIngredients] = useState([])
    const [tools, setTools] = useState([])
    const [instructions, setInstructions] = useState([])
    const [enterPressed, setEnterPressed] = useState(false)
    const ingredientsRef = React.createRef()
    const toolRef = React.createRef()

    function addTool (event) {
        if (event.key == 'Enter') {
            setEnterPressed(true)
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
        index !== -1 ? newTools.splice(index,1) :
        console.log(index)
        console.log(tools)
        tools == undefined || tools.length <= 0 ? setTools([]) : setTools(newTools)
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
                    <Input variant="flushed" isRequired={true} placeholder="Recipe Name"/>
                <Box mb="3vh">
                    {/* <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="1vh">
                        Recipe Name
                    </Text> */}
                </Box>
                <Box mb="3vh">
                    <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="1vh">
                        Ingredients
                    </Text>
                    <Input id="ingredients" placeholder="Ingredients"/>
                </Box>
                <Box mb="3vh">
                    <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="1vh">
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
                    <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="1vh">
                        Nutrition
                    </Text>
                    <Flex flexDirection="column">
                        <InputGroup>
                            <Input placeholder="Calories"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Protein"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Carbohydrates"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Fat"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Cholesterol"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Sodium"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Sugar"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Fibre"/>
                            <InputRightAddon
                                pointerEvents="none"
                                children="mg"
                            />
                        </InputGroup>
                    </Flex>
                </Box>
                <Box mb="3vh">
                    <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="1vh">
                        Instructions
                    </Text>
                    <Textarea resize="none" placeholder="Instructions"/>
                </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

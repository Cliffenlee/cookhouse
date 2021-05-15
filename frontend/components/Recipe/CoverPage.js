import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon, CheckCircleIcon, CloseIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/input'
import { Box, Flex, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/number-input'
import { Tag } from '@chakra-ui/tag'
import { Textarea } from '@chakra-ui/textarea'
import axios from 'axios'
import { Image } from '@chakra-ui/react'
import React, { createRef, useState } from 'react'
import Loader from '../common/Loader'
import Error from '../common/Error'
import {useDropzone} from 'react-dropzone'
import {v4 as uuidv4} from 'uuid'

export default function CoverPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // state
    const [isLoading, setIsLoading] = useState(false)
    const [ingredients, setIngredients] = useState([])
    const [tools, setTools] = useState([])
    const [instructions, setInstructions] = useState([])
    const [error, setError] = useState(false)
    const [recipeImage, setRecipeImage] = useState(undefined)

    // ref
    const recipeNameRef = React.createRef()
    const ingredientRef = React.createRef()
    const toolRef = React.createRef()
    const instructionRef = React.createRef()
    const caloriesRef = React.createRef()
    const proteinRef = React.createRef()
    const carbohydratesRef = React.createRef()
    const fatRef = React.createRef()
    const cholesterolRef = React.createRef()
    const sodiumRef = React.createRef()
    const sugarRef = React.createRef()
    const fiberRef = React.createRef()
    const servingRef = React.createRef()

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
        if (event.key == 'Enter' || event.type == "click") {
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
        if (event.key == 'Enter' || event.type == "click") {
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


    // upload image
    // const {
    //     acceptedFiles,
    //     fileRejections,
    //     getRootProps,
    //     getInputProps
    //   } = useDropzone({
    //     accept: 'image/jpeg, image/png',
    //     maxFiles: 1
    //   })

    // const acceptedFileItems = acceptedFiles.map(file => (
    // <ListItem key={file.path}>
    //     {file.path} - {file.size} bytes
    // </ListItem>
    // ));

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
      //   disabled: typeof presignedUploadUrl !== 'string',
        onDrop: handleDrop,
      });

    function handleDrop([pendingImage]) {
        setRecipeImage(pendingImage)
    }



    async function createRecipe () {
        setIsLoading(true)
        const uuid = recipeImage ? uuidv4() : undefined
        try {
            const requestBody = {
                user_id: 1,
                serving: parseInt(servingRef.current.value),
                name: recipeNameRef.current.value,
                nutrition: {
                    calories: parseInt(caloriesRef.current.value),
                    protein: parseInt(proteinRef.current.value),
                    carbohydrates: parseInt(carbohydratesRef.current.value),
                    fat: parseInt(fatRef.current.value),
                    cholesterol: parseInt(cholesterolRef.current.value),
                    sodium: parseInt(sodiumRef.current.value),
                    sugar: parseInt(sugarRef.current.value),
                    fiber: parseInt(fiberRef.current.value)
                },
                ingredients: ingredients.map(ingredient => {
                    return {ingredient_name: null, description: ingredient}
                }),
                instructions: instructions.map((instruction, index) => {
                    return {step: index+1, instruction: instruction}
                }),
                tools: tools.map(tool => {
                    return {tool_name: tool}
                })
            }

            // create recipe in db
            const dataResponse = await axios.post("http://localhost:8080/recipe", requestBody)
            console.log(dataResponse)

            // get presigned url for s3
            const presignedRequestBody = {
                "bucket_name": "1",
                "object_name": uuid
            }

            // const presignedUploadUrl = await axios.post("https://fol3okxax2.execute-api.ap-southeast-1.amazonaws.com/dev", presignedRequestBody)
            // const imageResponse = await fetch(
            //     new Request(presignedUploadUrl, {
            //       method: 'POST',
            //       body: pendingImage,
            //       headers: new Headers({
            //         'Content-Type': 'image/*',
            //       }),
            //     }),
            //   );
            // if (imageResponse.status !== 200) {
            // // The upload failed, so let's notify the caller.
            // setError(true)
            // // error toast
            // }

        } catch (responseError) {
            console.log(responseError)
            setError(true)
            // error toast
        } finally {
            setIsLoading(false)
        }
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

                {isLoading ?<ModalBody px="3vw"><Flex justifyContent="center" alignItems="center" width="100%" height="100%"><Loader/></Flex></ModalBody>:
                <ModalBody overflow="scroll" justifyContent="center" px="3vw">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Input width="70%" variant="flushed" size="lg" ref={recipeNameRef} isRequired={true} placeholder="Recipe name"/>
                        <Flex width="20%" flexDirection="column">
                            <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                                Serving size
                            </Text>
                            <NumberInput min={0} allowMouseWheel>
                                <NumberInputField ref={servingRef}/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                    </Flex>
                    <Box mb="3vh">
                    </Box>
                    <Box mb="3vh">
                        <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                            Ingredients
                        </Text>
                        <InputGroup>
                            <Input ref={ingredientRef} placeholder="Ingredients" onKeyDown={addIngredient}/>
                            <InputRightAddon
                                padding={0}
                                pointerEvents="cursor"
                                children={<Button borderStartRadius="0" onClick={addIngredient} colorScheme="yellow">Add</Button>}
                                />
                        </InputGroup>
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
                        <InputGroup>
                            <Input placeholder="Tools" onKeyDown={addTool} ref={toolRef} />
                            <InputRightAddon
                                padding={0}
                                pointerEvents="cursor"
                                children={<Button borderStartRadius="0" colorScheme="yellow">Add</Button>}
                                />
                        </InputGroup>
                        <Box mt={4}>
                            {tools.map((tool, index) => {
                                return <Tag colorScheme="green" key={index} py={2} mr={2} cursor="pointer" onClick={() => removeTool(index)}>{tool}<CloseIcon ml={2} fontSize="0.5rem"/></Tag>
                            })}
                        </Box>
                    </Box>
                    <Flex justifyContent="space-between" p={0}>
                        <Box mb="3vh" width="30%">
                            <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                                Nutrition
                            </Text>
                            <Flex flexDirection="column">
                                <InputGroup>
                                    <Input ref={caloriesRef} type="number"placeholder="Calories"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="kcal"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={proteinRef} type="number"placeholder="Protein"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="g"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={carbohydratesRef} type="number"placeholder="Carbohydrates"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="g"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={fatRef} type="number"placeholder="Fat"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="g"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={cholesterolRef} type="number"placeholder="Cholesterol"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="mg"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={sodiumRef} type="number"placeholder="Sodium"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="g"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={sugarRef} type="number"placeholder="Sugar"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="mg"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input ref={fiberRef} type="number"placeholder="Fiber"/>
                                    <InputRightAddon
                                        width = "25%"
                                        justifyContent="center"
                                        pointerEvents="none"
                                        children="g"
                                    />
                                </InputGroup>
                            </Flex>
                        </Box>
                        <Box width="50%" p={0}>
                            <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb="2vh">
                                Recipe image
                            </Text>
                            <Flex mb={4} flexDirection="column" justifyContent="center" alignItems="center" cursor="pointer" textAlign="center" borderWidth="2px" height="50%" borderStyle="dotted" p={8} {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                    <Text fontSize="lg" color="gray.400" lineHeight="1.2" mb={2}>Drop your image here</Text>
                                    <Text fontSize="xs" color="gray.400" lineHeight="1.2">(Only jpg and png images will be accepted)</Text>
                            </Flex>
                            {/* <Text fontSize="md">Accepted files</Text>
                            <List>{acceptedFileItems}</List> */}
                        </Box>
                    </Flex>
                    <Box mb="3vh">
                        <Text fontWeight="500" textAlign="start" fontSize="1.2rem" mb={7}>
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
                </ModalBody>}
                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button colorScheme="blue" onClick={createRecipe}>Create</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

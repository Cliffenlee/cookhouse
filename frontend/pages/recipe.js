import React, { Component }  from 'react'
import axios from 'axios';
import Loader from '../components/common/Loader'
import Error from "../components/common/Error"
import { Box, Center, Flex, Stack } from '@chakra-ui/layout'
import { Text, Heading, Tag } from "@chakra-ui/react"
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: null,
            loading: true,
            error: false
        }
    }

    async getAllRecipes() {
        this.setState({loading: true})
        try {
            const data = await axios.get('http://localhost:8080/recipes')
            this.setState({recipes: data.data.slice(0,3)})
            console.log(this.state.recipes)
        } catch (error) {
            this.setState({error: true})
        } finally {
            this.setState({loading: false})
        }
    }

    componentDidMount() {
        this.getAllRecipes()
    }

    render () {
        const {recipes, loading, error} = this.state

        if (loading) {
            return (
                <Loader/>
            )
        }

        if (error) {
            return (
                <Error />
            )
        }

        return (
        <Box className="body">
            <Box className="book">
            {recipes.map((recipe, index)=> {
                console.log("c" + (index+1));
                return <input type="checkbox" id={"c"+(index+1)}/>
            })}
                <Box id="cover">
                    <Heading mx={8} my={8} textAlign="start">
                        MY RECIPES
                    </Heading>
                    <Box mx={5}>
                        {recipes.map((recipe, index)=> {
                            return (
                                <Text p={3} lineHeight="1.5" fontSize="md">
                                    {index+1}. {recipe.name}
                                </Text>
                            )
                        })}
                    </Box>
                </Box>
                <Box className="flip-book">
                    {recipes.map((recipe, index)=> {
                        return (
                            <Box className="flip" zIndex={recipes.length - parseInt(index)} id={"p"+(index+1)}>
                                <Box className="back">
                                    PAGE {index+1}
                                    <label className="back-btn" htmlFor={"c"+(index+1)}>
                                        <Tag padding={5}>
                                            <ArrowBackIcon/>
                                        </Tag>
                                    </label>
                                </Box>
                                <Flex position="relative" flexDirection="column" className="front" padding={5} overflowY="scroll" overflowX="hidden">
                                    <Heading textTransform="uppercase" mt={3} mb={8}>{recipe.name}</Heading>
                                        {recipe.instructions.map((instruction, instructionIndex) => {
                                            return (
                                            <Box position="relative" borderWidth="2px" borderColor="gray.300" padding={5} borderRadius="lg" my="4">
                                                <Tag colorScheme="messenger" position="absolute" left="0" top="0" transform="translateX(-50%) translateY(-50%)" borderRadius="full">{instructionIndex+1}</Tag>
                                                <Text lineHeight="1.2" fontSize="md">{instruction.instruction}</Text>
                                            </Box>
                                            )
                                        })}
                                        <label className="next-btn" htmlFor={"c"+(index+1)}>
                                            <Tag padding={5}>
                                                <ArrowForwardIcon/>
                                            </Tag>
                                        </label>
                                </Flex>
                            </Box>
                        )
                    })}
                    {/* <Box className="flip" id ="p1">
                        <Box className="back">
                            my second page.
                            <label className="back-btn" htmlFor={"c"+"1"}>Back</label>
                        </Box>
                        <Box className="front">
                            <h2>Apple</h2>
                            <p>some paragraph about apple.</p>
                            <label className="next-btn" htmlFor={"c"+"1"}>Next</label>
                        </Box>
                    </Box>
                    <Box className="flip" id ="p2">
                        <Box className="back">
                            my second page.
                            <label className="back-btn" htmlFor="c2">Back</label>
                        </Box>
                        <Box className="front">
                            <h2>Pineapple</h2>
                            <p>some paragraph about apple.</p>
                            <label className="next-btn" htmlFor="c2">Next</label>
                        </Box>
                    </Box>
                    <Box className="flip" id ="p3">
                        <Box className="back">
                            my second page.
                            <label className="back-btn" htmlFor="c3">Back</label>
                        </Box>
                        <Box className="front">
                            <h2>Strawberry</h2>
                            <p>some paragraph about apple.</p>
                            <label className="next-btn" htmlFor="c3">Next</label>
                        </Box>
                    </Box> */}
                </Box>
            </Box>
        </Box>
        )
    }
}

export default Recipe;

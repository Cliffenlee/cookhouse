import React, { Component }  from 'react'
import axios from 'axios';
import Loader from '../components/common/Loader'
import Error from "../components/common/Error"
import { Box, Center, Flex, Stack } from '@chakra-ui/layout'
import { Text, Heading, Tag, VisuallyHidden, Checkbox } from "@chakra-ui/react"
import { Input } from "@chakra-ui/input"
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import Description from '../components/Recipe/Description';
import Back from '../components/Recipe/Back';
import Front from '../components/Recipe/Front';
import SearchPage from '../components/Recipe/SearchPage';
import BackCover from '../components/Recipe/BackCover';

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: null,
            loading: true,
            error: false
        }
    }

    handleCheck = (event) => {
        const index = parseInt(event.target.id.substring(1))
        const pageId = "p" + index
        if (event.target.checked) {
            const zIndex = index+1
            document.getElementById(pageId).style = `transform: rotateY(-180deg); z-index:${zIndex};`
        }
        else {
            const zIndex = pageId == "p0" ? 99 : this.state.recipes.length- index
            document.getElementById(pageId).style = `transform: rotateY(0deg); z-index:${zIndex};`
        }
    }

    async getAllRecipes() {
        this.setState({loading: true})
        try {
            let data = await axios.get('http://localhost:8080/recipes')
            this.setState({recipes: data == undefined || data.length == 0 ? null : data.data})
            if (data !== undefined && data.length !== 0) {
                const first = data.data[0]
                this.setState({
                    firstDescription: <Description name={first.name} tools={first.tools} ingredients={first.ingredients} nutrition={first.nutrition} />
                })
            }
        } catch (error) {
            console.log(error)
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

        if(recipes == null || recipes.length == 0) {
            console.log("recipes is null or length is 0.")
            return (
                <Box className="body">
                    <Box className="book">
                    <input onChange={this.handleCheck} type="checkbox" id="c0"/>
                        <Box id="cover">
                            <Heading mx={8} my={8} textAlign="start">
                                No recipes available.
                            </Heading>
                        </Box>
                        <Box className="flip-book">
                            <Box className="flip" zIndex={99} id ="p0">
                                <Box className="back">
                                    <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
                                        <Text className="back-logo">
                                            cookhouse
                                        </Text>
                                    </Flex>
                                    <label className="back-btn" htmlFor="c0">
                                        <Tag padding={5}>
                                            <ArrowBackIcon/>
                                        </Tag>
                                    </label>
                                </Box>
                                <Box className="front">
                                    <Flex flexDirection="column" justifyContent="center" alignItems="center" padding={8}>
                                        <Input focusBorderColor="pink.400" placeholder="Search for a recipe"></Input>
                                    </Flex>
                                    <label className="next-btn" htmlFor="c0">
                                        <Tag padding={5}>
                                            <ArrowForwardIcon/>
                                        </Tag>
                                    </label>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }

        return (
        <Box className="body">
            <Box className="book">
            <input onChange={this.handleCheck} type="checkbox" id="c0"/>
            {recipes.map((recipe, index)=> {
                return <input onChange={this.handleCheck} key={index+1} type="checkbox" id={"c"+(index+1)}/>
            })}
                <Box id="cover">
                    <Heading mx={8} my={8} textAlign="start">
                        MY RECIPES
                    </Heading>
                    <Box mx={5}>
                        {recipes.map((recipe, index)=> {
                            return (
                                <Text key={index} p={3} lineHeight="1.5" fontSize="md">
                                    {index+1}. {recipe.name}
                                </Text>
                            )
                        })}
                    </Box>
                </Box>
                <Box className="flip-book">
                    <Box className="flip" zIndex={recipes.length + 99} id ="p0">
                        <Back recipe={recipes[0]} selector="c0"/>
                        <SearchPage recipes={recipes} selector="c0"/>
                    </Box>
                    {recipes.map((recipe, index)=> {
                        if (index == recipes.length - 1) {
                            return (
                                <Box key={index} className="flip" zIndex={recipes.length - parseInt(index)} id={"p"+(index+1)}>
                                    <BackCover selector={"c"+(index+1)} />
                                    <Front key={index} instructions={recipe.instructions} selector={"c"+(index+1)} recipeName={recipe.name} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box key={index} className="flip" zIndex={recipes.length - parseInt(index)} id={"p"+(index+1)}>
                                    <Back recipe={recipes[index+1]} selector={"c"+(index+1)} />
                                    <Front key={index} instructions={recipe.instructions} selector={"c"+(index+1)} recipeName={recipe.name} />
                                </Box>
                            )
                        }
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

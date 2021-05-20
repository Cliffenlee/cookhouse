import React, { Component }  from 'react'
import axios from 'axios';
import Loader from '../components/common/Loader'
import Error from "../components/common/Error"
import { Box } from '@chakra-ui/layout'
import { Heading } from "@chakra-ui/react"
import Back from '../components/Recipe/Back';
import Front from '../components/Recipe/Front';
import SearchPage from '../components/Recipe/SearchPage';
import BackCover from '../components/Recipe/BackCover';
import NoRecipe from '../components/Recipe/NoRecipe';
import CoverPage from '../components/Recipe/CoverPage';

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
        console.log("index", index)
        const pageId = "p" + index
        let zIndex
        if (event.target.checked) {
             zIndex = index+1
            document.getElementById(pageId).style = `transform: rotateY(-180deg); z-index:${zIndex};`
        }
        else {
            if (this.state.recipes == undefined || this.state.recipes.length == 0) {
                zIndex = 1
            } else {
                zIndex = pageId == "p0" ? this.state.recipes.length+2 : this.state.recipes.length- index + 1
            }
            document.getElementById(pageId).style = `transform: rotateY(0deg); z-index:${zIndex};`
        }
    }

    async getAllRecipes() {
        this.setState({loading: true})
        try {
            let data = await axios.get('http://localhost:8080/recipes')
            let recipesWithIndex
            if (data.data !== undefined && data.data.length !== 0) {
                recipesWithIndex = data.data.map((recipe, index) => ({...recipe, page:index}))
            }
            this.setState({recipes: data == undefined || data.length == 0 ? null : recipesWithIndex})
        } catch (error) {
            console.log(error)
            this.setState({error: true})
        } finally {
            this.setState({loading: false})
        }
    }

    async toHomePage() {
        const checked = Array.from(document.getElementsByClassName("checkbox")).filter(document => document.checked)
        for (let i = checked.length-1; i >= 0; i --) {
            checked[i].checked = false
            if (i == 0) {
                document.getElementById("p"+i).style = `transform: rotateY(0deg); z-index:${this.state.recipes.length + 5};transition: all 0.9s cubic-bezier(0.2, 0.015, 0.055, 1);`
            } else {
                document.getElementById("p"+i).style = `transform: rotateY(0deg); z-index:${this.state.recipes.length - i + 1};transition: all 0.9s cubic-bezier(0.3, 0.025, 0.155, 1);`
            }
            await new Promise(r => setTimeout(r, 100));
        }
    }

    componentDidMount() {
        this.getAllRecipes()
    }

    render () {
        const {recipes, loading, error} = this.state

        if (loading) {
            return (
                <Box className="body" display="flex" justifyContent="center" alignItems="center">
                    <Loader/>
                </Box>
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
                    <input className="checkbox" onChange={this.handleCheck} type="checkbox" id="c0"/>
                        <Box id="cover">
                            <Heading mx={8} my={8} textAlign="start">
                                COVER PAGE
                            </Heading>
                        </Box>
                        <Box className="flip-book">
                            <Box className="flip" zIndex={99} id ="p0">
                                <BackCover selector="c0"/>
                                <NoRecipe/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }

        return (
        <Box className="body">
            <Box className="book">
            <input className="checkbox" onChange={this.handleCheck} type="checkbox" id="c0"/>
            {recipes.map((recipe, index)=> {
                return <input className="checkbox" onChange={this.handleCheck} key={index+1} type="checkbox" id={"c"+(index+1)}/>
            })}
                <CoverPage />
                <Box className="flip-book">
                    <Box className="flip" zIndex={recipes.length+2} id ="p0">
                        <SearchPage recipes={recipes} selector="c0"/>
                        <Back toHomePage={this.toHomePage.bind(this)}recipe={recipes[0]} selector="c0"/>
                    </Box>
                    {recipes.map((recipe, index)=> {
                        if (index == recipes.length - 1) {
                            return (
                                <Box key={index} className="flip" zIndex={recipes.length - parseInt(index)} id={"p"+(index+1)}>
                                    <BackCover selector={"c"+(index+1)} />
                                    <Front recipe={recipe} selector={"c"+(index+1)} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box key={index} className="flip" zIndex={recipes.length - parseInt(index)} id={"p"+(index+1)}>
                                    <Back toHomePage={this.toHomePage.bind(this)}recipe={recipes[index+1]} selector={"c"+(index+1)} />
                                    <Front recipe={recipe} selector={"c"+(index+1)}/>
                                </Box>
                            )
                        }
                    })}
                </Box>
            </Box>
        </Box>
        )
    }
}

export default Recipe;

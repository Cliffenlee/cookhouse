import { Image } from '@chakra-ui/image';
import { Box, Flex } from '@chakra-ui/layout';
import axios from 'axios';
import React, { Component } from 'react'
import Error from '../components/common/Error';
import Loader from '../components/common/Loader';

export default class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            loading: true,
            error: false
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

    componentDidMount() {
        this.getAllRecipes()
    }

    render() {

        const {loading, recipes, error} = this.state

        if (loading) {
            return (
                <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
                    <Loader/>
                </Flex>

            )
        }

        if (error) {
            return (
                    <Error/>
            )
        }

        return (
            <Box>
                <div className="home-shadow"/>
            </Box>
        )
    }
}

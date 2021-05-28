import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
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
            <Flex flexDirection="column" width="100vw" overflowX="scroll">
                <Flex flexDirection="column" width="100vw" height="100vh" background="white" justifyContent="center" padding={8}>
                    <Box>
                        <Heading fontWeight="300" color="orange.400" size="3xl" ml="5vw" mb={8}>
                            Fresh faces
                        </Heading>
                    </Box>
                    <Flex width="100%" height="50vh" background="white" alignItems="center" overflowX="scroll">
                    {recipes.map((recipe, index) => {
                        const imageLink = recipe.image_name ? `https://cookhouse-images.s3-ap-southeast-1.amazonaws.com/${recipe.image_name}` : "/assets/missing.jpg"
                        return (<Box cursor="pointer" height="100%" width="100%" mr={8}>
                                <Image src={imageLink} maxHeight="100%"/>
                                <Text textTransform="uppercase" color="orange.400" fontSize="xl" lineHeight="1.2" mt={8}>
                                    {recipe.name}
                                </Text>
                            </Box>)
                    })}
                    </Flex>
                </Flex>
            </Flex>
        )
    }
}

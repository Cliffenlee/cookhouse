import { SearchIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { InputGroup } from '@chakra-ui/react';
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
            <Flex flexDirection="column" width="100vw" height="100vh" background="white" justifyContent="center" padding="10vw">
                <Flex justifyContent="center">
                    <InputGroup width="60vw" size="lg" mb={20}>
                        <InputLeftElement
                        pointerEvents="none"
                        children={ <SearchIcon color="blackAlpha.500"/> }/>
                        <Input boxShadow="0 0 5px #808080" color={'blackAlpha.700'} focusBorderColor="blue.400" placeholder="Search for a recipe"/>
                    </InputGroup>
                </Flex>
                <Box>
                    <Heading fontWeight="300" color="orange.400" size="3xl" ml="5vw" mb={8}>
                        Popular Recipes
                    </Heading>
                </Box>
                <Flex position="relative" height="50vh" background="white" alignItems="center" overflowX="auto">
                {recipes.map((recipe, index) => {
                    const imageLink = recipe.image_name ? `https://cookhouse-images.s3-ap-southeast-1.amazonaws.com/${recipe.image_name}` : "/assets/missing.jpg"
                    return (<Flex background="orange.300" _hover={{background: "orange.400"}} textAlign="center" flexDirection="column" position="relative" transition="0.5s" cursor="pointer" height="100%" width="30%" mr={8}>
                            <Image src={imageLink} height="70%" width="50vw" objectFit="cover"/>
                            {recipe.image_name ? "" : <Box position="absolute" color="gray.700" top="35%" left="50%" transform="translateX(-50%) translateY(-50%)"><Text fontSize="md" lineHeight="1.2">Recipe image unavailable.</Text></Box>}
                            <Box width="100%" px={8}>
                                <Text textTransform="uppercase" color="white" fontSize="xl" lineHeight="1.2" mt={8}>
                                    {recipe.name}
                                </Text>
                            </Box>
                        </Flex>)
                })}
                </Flex>
            </Flex>
        )
    }
}

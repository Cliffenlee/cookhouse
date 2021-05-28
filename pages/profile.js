import { Image } from '@chakra-ui/image'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import axios from 'axios'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../components/common/Loader'

export default function profile() {

    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    async function getAllRecipes() {
        setLoading(true)
        try {
            let data = await axios.get('http://localhost:8080/recipes')
            console.log(data.data)
            setRecipes(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllRecipes()
    }, [])

    if (loading) {
        return (
            <Flex mt="80px" width="100vw" height="calc(100vh - 80px)" justifyContent="center" alignItems="center" background="transparent">
                <Loader/>
            </Flex>
        )
    }

    function moveToRecipe(index) {
        console.log(index)
        Router.push({
            pathname: "/recipe",
            query: {
                index: index,
                user_id: 1
            }
        })
    }

    return (
        <Flex mt="80px" width="100vw" flexDirection="column" background="transparent">
                <Flex flexDirection="column" className="profile" background="blue.200">
                    <Flex justifyContent="center" alignItems="center" height="30%">
                        <Image minWidth="100%" minHeight="100%" src="/assets/banner.jpg"></Image>
                    </Flex>
                    <Flex flexDirection="column" position="relative" background="white" height="100%">
                        <Flex position="absolute" top="0" left="50%" transform="translateX(-50%) translateY(-50%)" borderRadius="50%" overflow="hidden" justifyContent="center" alignItems="center" height="14vh" width="14vh" background="green.200">
                            <Image minWidth="100%" minHeight="100%" src="/assets/gordon.jpg"/>
                        </Flex>
                        <Flex flexDirection="column" alignItems="center" justifyContent="center" mt={100}>
                            <Heading size="md">
                                Gordon Ramsay
                            </Heading>
                            <Text mt={2} color="gray.500" fontSize="md">England, London</Text>
                            <Box width="40%" mt={8} textAlign="center">
                                <Text fontSize="1rem" lineHeight="2">
                                    I've had a lot of success; I've had failures, so I learn from the failure. Put your head down and work hard. Never wait for things to happen, make them happen for yourself through hard graft and not giving up. If you want to become a great chef, you have to work with great chefs.
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider mb={8}/>
                <Tabs variant="enclosed">
                    <TabList ml="20vw">
                        <Tab mr={5}>
                            Recipes
                        </Tab>
                        <Tab>
                            Achievements
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel padding={0}>
                            <Flex flexDirection="column" className="profile-recipe" width="100vw" background="gray.100" px="20vw" py="5vh">
                                <Heading mb={5}>
                                    Recipes
                                </Heading>
                                <Flex flexWrap="wrap">
                                    {recipes.map((recipe, index) => {
                                        const imageLink = recipe.image_name ? `https://cookhouse-images.s3-ap-southeast-1.amazonaws.com/${recipe.image_name}` : "/assets/missing.jpg"
                                        return (
                                            <Flex cursor="pointer" onClick={() => moveToRecipe(index)} flexDirection="column" key={index} height="40vh" width="30vh" background="white" my="5vh" mr="4vw">
                                                {recipe.image_name ? <Image height="60%" width="100%" objectFit="cover" src={imageLink}/> :
                                                    <Box position="relative" height="60%" width="100%" textAlign="center">
                                                        <Image height="100%" width="100%" objectFit="cover" src={imageLink} opacity="0.2"/>
                                                        <Text position="absolute" top="50%" left="50%" transform="translateX(-50%) translateY(-50%)" fontSize="md" width="60%" color="gray.600" lineHeight="1.2" >
                                                            No cover picture available
                                                        </Text>
                                                    </Box>}
                                                <Flex height="40%" p={8} overflow="auto">
                                                    <Text fontSize="md" fontWeight="400" lineHeight="1.2" wordBreak textTransform="uppercase">
                                                        {recipe.name}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel padding={0}>
                            <Flex className="profile-achievements" width="100vw" background="gray.100" px="20vw" py="5vh">
                                <Heading mb={5}>
                                    Achievements
                                </Heading>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
        </Flex>
    )
}

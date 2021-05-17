import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import Router from 'next/router'
import React from 'react'

export default function login() {
    function userLogin() {
        Router.push('/')
    }

    function index() {
        Router.push('/')
    }

    return (
        <Box overflow="hidden">
            <Flex height="100vh" width="100%" justifyContent="center" alignItems="center" background="#707773">
                {/* <Image src="/assets/login.jpg" position="absolute" zIndex="-1" width="100vw"/> */}
                <Flex width="65%" height="80%">
                    <Flex width="50%" height="100%" borderStartRadius="15px" overflow="hidden" justifyContent="center" alignItems="center">
                        <Image src="/assets/login2.jpg" minWidth="100%" minHeight="100%" borderStartRadius="15px"/>
                    </Flex>
                    <Flex position="relative" flexDirection="column" alignItems="center" width="50%" height="100%" background="white" borderEndRadius="15px">
                        <Heading cursor="pointer" onClick={index} position="absolute" top="15%" left="50%" transform="translateX(-50%)"size="2xl" fontFamily="Artbrush" fontWeight="400">
                            Cookhouse
                        </Heading>
                        <Heading size="md" mt="25vh" mb={20}>
                            Welcome to cookhouse
                        </Heading>
                        <Box width="60%" mb={10}>
                            <Text fontSize="xs" fontWeight="500">
                                Username
                            </Text>
                            <Input variant="flushed" placeholder="Username" mb={5}/>
                            <Text fontSize="xs" fontWeight="500">
                                Password
                            </Text>
                            <Input variant="flushed" placeholder="Password" mb={2}/>
                            <Text textAlign="end" cursor="pointer" _hover={{textDecoration: "underline"}} fontSize="xs" color="blue.300">
                                Forgot password?
                            </Text>
                        </Box>
                        <Button background="#707773" color="#fff" _hover={{background: "#5d615e"}} borderRadius={10} width="10vw" mb={5} onClick={userLogin}>
                            Sign in
                        </Button>
                        <Divider width="60%" mb={5}/>
                        <Flex cursor="pointer" alignItems="center" justifyContent="center" height="3vh" width="10vw" borderRadius={10} padding="0">
                            <Image src="/assets/google.png" maxWidth="100%" maxHeight="100%" mr={2}/>
                            <Text>
                                Sign in with Google
                            </Text>
                        </Flex>
                        <Flex position="absolute" bottom="5%" left="50%" transform="translateX(-50%)">
                            <Text>
                                New user?&nbsp;
                            </Text>
                            <Box as="span" textDecoration="underline" color="blue.300" cursor="pointer" ><Text>Create account.</Text></Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

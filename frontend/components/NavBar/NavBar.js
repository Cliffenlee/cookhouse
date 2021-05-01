import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import NavBarLink from './NavBarLink'
import Logo from './Logo'

export default function NavBar() {
    //FBDAC9 darker bg
    //FDF0E2 lighter bg
    //FE9071 icon orange
    //FE9477 word orange
    return (
        <Flex position="relative" height="7vh" minHeight="60px" alignItems="center" background="#FDF4EB" color="#FE9477" padding="7" fontFamily="Roboto">
            <Box position="absolute" left="5%" >
                <Logo/>
            </Box>
            <Flex position="absolute" right="10%">
                <NavBarLink name="My Recipes" link="/recipe"/>
                <NavBarLink name="Explore" link="/explore"/>
            </Flex>
        </Flex>
    )
}

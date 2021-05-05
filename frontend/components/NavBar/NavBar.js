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
        <Flex className="nav-bar">
            <Logo />
            <Flex>
                <NavBarLink name="MY RECIPES" link="/recipes" />
                <NavBarLink name="PROFILE" link="/profile" />
                <NavBarLink name="Recipe" link="/recipe" />
            </Flex>
        </Flex>
    )
}

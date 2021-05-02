import React from 'react'
import { Flex } from '@chakra-ui/react'
import NavBarLink from './NavBarLink'
import Logo from './Logo'

export default function NavBar() {
    //FBDAC9 darker bg
    //FDF0E2 lighter bg
    //FE9071 icon orange
    //FE9477 word orange
    return (
        <Flex height="7vh" minHeight="60px" justifyContent="center" alignItems="center" background="#FDF4EB" color="#FE9477">
                <NavBarLink name="MY RECIPES" link="/recipe" />
                <Logo />
                <NavBarLink name="PROFILE" link="/profile" />
        </Flex>
    )
}

import React from 'react'
import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
import NavBarLink from './NavBarLink'
import Logo from './Logo'

export default function NavBar() {
    //FBDAC9 darker bg
    //FDF0E2 lighter bg
    //FE9071 icon orange
    //FE9477 word orange
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <Flex className="nav-bar">
            <Logo />
            <Flex className="nav-links">
                <NavBarLink name="MY RECIPES" link="/recipes" />
                <NavBarLink name="PROFILE" link="/profile" />
                <NavBarLink name="LOGOUT" link="/" />
            </Flex>
        </Flex>
    )
}

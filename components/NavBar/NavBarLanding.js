import React from 'react'
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
import NavBarLink from './NavBarLink'
import LandingLogo from './LandingLogo'

export default function NavBarLanding() {
    //FBDAC9 darker bg
    //FDF0E2 lighter bg
    //FE9071 icon orange
    //FE9477 word orange
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <Flex className="nav-bar-landing">
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Menu
                    </DrawerHeader>
                    <DrawerBody>
                        <p>Options</p>
                        <p>Options</p>
                        <p>Options</p>
                        <p>Options</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <HamburgerIcon onClick={onOpen} fontSize="2rem" style={{cursor:"pointer"}}/>
            <LandingLogo />
            <Flex className="nav-links">
                <NavBarLink name="LOG IN" link="/login" />
            </Flex>
        </Flex>
    )
}

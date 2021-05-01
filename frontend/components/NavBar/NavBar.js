import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import NavBarLink from './NavBarLink'
import Logo from './Logo'

export default function NavBar() {
    //FBDAC9 darker bg
    //FDF0E2 lighter bg
    //FE9071 icon orange
    //FE9477 word orange
    const navBarLinks = [
        {
            "id": 1,
            "name": "My Recipes",
            "link": "/recipe"
        },
        {
            "id": 2,
            "name": "Profile",
            "link": "/profile"
        }
    ]
    return (
        <Flex height="7vh" minHeight="60px" justifyContent="center" alignItems="center" background="#FDF4EB" color="#FE9477" padding="7" fontFamily="Roboto">
            <NavBarLink name="MY RECIPES" link="/recipe" />
            <Box marginX="7vw">
                <Logo/>
            </Box>
            <NavBarLink name="PROFILE" link="/profile" />
            {/* <Flex position="absolute" right="10%">
                {navBarLinks.map(navBarLink => {
                    return <NavBarLink key={navBarLink.id} name={navBarLink.name} link={navBarLink.link} />
                })}
            </Flex> */}
        </Flex>
    )
}

import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import React from 'react'

export default function Background() {
    return (
        <Box position="relative">
            <Image zIndex="-1" position="absolute" top="0" src="/assets/chopping.jpg" height="200vh" width="100vw" objectFit="cover"/>
        </Box>
    )
}

import { AddIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

export default function DefaultPicture() {
    return (
        <Box cursor="pointer" className="default-picture-wrapper" position="relative" height="50%" maxWidth="100%" overflow="hidden" outline="3px dotted gray">
            <Box>
                <Image className="default-picture" maxHeight="100%" maxWidth="100%" src="/assets/login.jpg" opacity="0.6" />
            </Box>
            <Box className="default-picture-text" color="gray.500" position="absolute" top="50%" left="50%" transform="translateX(-50%) translateY(-50%)" textAlign="center">
                <AddIcon/>
                <Text fontSize="lg" mt={4}>Add a cover picture!</Text>
            </Box>
        </Box>
    )
}

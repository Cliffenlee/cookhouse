import React from 'react'
import {Box, Flex, Tag, Text} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export default function BackCover({selector}) {
    return (
        <Flex className="back" justifyContent="center" alignItems="center">
            <Box fontFamily="Artbrush" fontSize="80px">
                cookhouse
            </Box>
            <label className="back-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowBackIcon/>
                </Tag>
            </label>
        </Flex>
    )
}

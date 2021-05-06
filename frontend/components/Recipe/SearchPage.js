import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React from 'react'

export default function SearchPage({selector}) {
    return (
        <Box className="front">
            <Flex flexDirection="column" justifyContent="center" alignItems="center" padding={8}>
                <Input focusBorderColor="pink.400" placeholder="Search for a recipe"></Input>
            </Flex>
            <label className="next-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowForwardIcon/>
                </Tag>
            </label>
        </Box>
    )
}

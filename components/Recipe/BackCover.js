import React from 'react'
import {Box, Flex, Tag, Text} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'


export default function BackCover({selector}) {
    return (
        <Box className="back">
            <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
                <Text className="back-logo">
                    cookhouse
                </Text>
            </Flex>
            <label className="back-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowBackIcon/>
                </Tag>
            </label>
        </Box>
    )
}

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React from 'react'

export default function NoRecipe() {
    return (
        <Flex position="relative" textAlign="center" className="front" flexDirection="column" alignItems="center" p={8}>
            <Heading size="xl">
                No Recipes available.
                <Text size="l" mt={20}>
                    Create one now!
                </Text>
            </Heading>
            <label className="next-btn" htmlFor="c0">
                <Tag padding={5}>
                    <ArrowForwardIcon/>
                </Tag>
            </label>
        </Flex>
    )
}

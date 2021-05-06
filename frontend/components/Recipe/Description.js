import { Flex } from '@chakra-ui/layout'
import React from 'react'

export default function Description({tools, ingredients, nutrition, name}) {
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" padding={8}>
            {name}
        </Flex>
    )
}

import { Box, Heading, Text } from '@chakra-ui/layout'
import React from 'react'

export default function SearchResult({result}) {
    return (
        <Box width="100%" borderWidth="3px" backgroundColor="gray.200" borderRadius="10px" padding={5} marginY={2}>
            <Text fontSize="xl" lineHeight="1.2">
                {result.name}
            </Text>
        </Box>
    )
}

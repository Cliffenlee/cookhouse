import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

export default function SearchResult({index, result, handler, navigate}) {
    const handleClick = (event) => {
        if (!document.getElementById("c0").checked) {
            handler()
            navigate(result.page)
        }
    }
    return (
        <Box onClick={handleClick} width="100%" borderWidth="3px" backgroundColor="gray.200" borderRadius="10px" padding={5} marginY={2}>
            <div width="100%" height="100%" className="search-result">
                <Text fontSize="xl" lineHeight="1.2">
                    {result.name}
                </Text>
            </div>
        </Box>
    )
}

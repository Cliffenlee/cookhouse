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
            <div onClick={handleClick} className="search-result">
                <Text fontSize="xl" lineHeight="1.2">
                    {result.name}
                </Text>
            </div>
    )
}

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React from 'react'

export default function Front({instructions, selector, recipeName}) {
    return (
        <Flex position="relative" flexDirection="column" overflowY="scroll" overflowX="hidden" className="front" padding={8}>
            <Heading textTransform="uppercase" mb={8}>{recipeName}</Heading>
            {instructions.map((instruction, instructionIndex) => {
                return (
                <Box key={instructionIndex} position="relative" borderWidth="2px" borderColor="gray.300" padding={5} borderRadius="lg" my="4">
                    <Tag colorScheme="messenger" position="absolute" left="0" top="0" transform="translateX(-50%) translateY(-50%)" borderRadius="full">{instructionIndex+1}</Tag>
                    <Text lineHeight="1.2" fontSize="md">{instruction.instruction}</Text>
                </Box>
                )
            })}
            <label className="next-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowForwardIcon/>
                </Tag>
            </label>
        </Flex>
    )
}

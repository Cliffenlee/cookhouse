import { useDisclosure } from '@chakra-ui/hooks'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import NewRecipe from './NewRecipe'

export default function CoverPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex justifyContent="space-around" alignItems="center" id="cover" p={8}>
            <Flex onClick={onOpen} cursor="pointer" _hover={{background: "blue.300"}} transition="0.2s" borderRadius="2xl" height="40%" width="40%" background="blue.200" flexDirection="column" justifyContent="center" alignItems="center" >
                <AddIcon fontSize="4vh" mb={5}/>
                <Text textAlign="center" fontSize="2vh">
                    Create a recipe
                </Text>
            </Flex>
            <Flex cursor="pointer" _hover={{background: "blue.300"}} transition="0.2s" borderRadius="2xl" height="40%" width="40%" background="blue.200" flexDirection="column" justifyContent="center" alignItems="center" >
                <EditIcon fontSize="4vh" mb={5}/>
                <Text textAlign="center" fontSize="2vh">
                    Edit a recipe
                </Text>
            </Flex>
            <NewRecipe isOpen={isOpen} onClose={onClose}/>
        </Flex>
    )
}

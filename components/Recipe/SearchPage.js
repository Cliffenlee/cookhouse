import { ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React from 'react'
import SearchResult from './SearchResult'

export default function SearchPage({selector, recipes}) {
    const [value, setValue] = React.useState("")
    const [results, setResults] = React.useState(recipes)
    function handler() {
        setValue("")
        setResults(recipes)
    }

    async function navigate(page) {
        for (let i = 0; i < page+1; i ++) {
            var box = document.getElementById("c"+i)
            box.checked = !box.checked;
            document.getElementById("p"+i).style = `z-index:${i+1};transform: rotateY(-180deg);transition: all 0.9s cubic-bezier(0.3, 0.025, 0.155, 1);`
            await new Promise(r => setTimeout(r, 100));
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value)
        if (event.target.value.trim() == "" || event.target.value.length <= 1 ) {
            setResults(recipes)
        } else {
            const newResult = recipes.filter( recipe => {
                return recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
            })
            setResults(newResult)
        }
    }

    return (
        <Box className="front" position="relative">
            <Flex height="100%" flexDirection="column" alignItems="center" padding={8}>
                <Heading mb={4}>
                    MY RECIPES
                </Heading>
                <InputGroup size="lg">
                    <InputLeftElement
                    pointerEvents="none"
                    children={ <SearchIcon color="blackAlpha.500"/> }/>
                    <Input value={value} onChange={handleChange} boxShadow="0 0 5px #808080" color={'blackAlpha.700'} focusBorderColor="blue.400" placeholder="Search for a recipe"/>
                </InputGroup>
                <Box width="100%" pt={5}>
                    <hr/>
                </Box>
                <Flex width="100%" flexDirection="column" alignItems="center" paddingY={3} overflowY="scroll" overflowX="hidden">
                    {results.map((result, index) => {
                        return <SearchResult navigate={navigate} handler={handler} key={index} result={result}/>
                    })}
                </Flex>
            </Flex>
            <label className="next-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowForwardIcon/>
                </Tag>
            </label>
            <Box className="bookmark">
                    <div className="bookmark-front">
                        Contents Page
                    </div>
            </Box>
        </Box>
    )
}

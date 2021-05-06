import { ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Divider, Flex } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React, { Component } from 'react'
import SearchResult from './SearchResult'

// export default class SearchPage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             recipes: props.recipes,
//             selector: props.selector
//         }
//     }


//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }


export default function SearchPage({selector, recipes}) {
    const [value, setValue] = React.useState("")
    const [result, setResult] = React.useState([])
    const handleChange = (event) => {
        setValue(event.target.value)
        if (event.target.value.trim() == "") {
            setResult([])
        } else {
            setResult(recipes.filter( recipe => {
                return recipe.name.toLowerCase().replace(/ /g, '').includes(event.target.value.toLowerCase(/ /g, ''))
            }))
        }
        console.log(result)
    }

    return (
        <Box className="front">
            <Flex flexDirection="column" justifyContent="center" alignItems="center" padding={8}>
                <InputGroup size="lg">
                    <InputLeftElement
                    pointerEvents="none"
                    children={ <SearchIcon color="blackAlpha.500"/> }/>
                    <Input value={value} onChange={handleChange} boxShadow="0 0 5px #808080" color={'blackAlpha.700'} focusBorderColor="blue.400" placeholder="Search for a recipe"/>
                </InputGroup>
                <Flex width="100%" flexDirection="column" justifyContent="center" alignItems="center" paddingY={5}>
                    {result.map((result, index) => {
                        return <SearchResult key={index} result={result}/>
                    })}
                </Flex>
            </Flex>
            <label className="next-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowForwardIcon/>
                </Tag>
            </label>

        </Box>
    )
}

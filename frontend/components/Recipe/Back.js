import React from 'react'
import {Box, Tag} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export default function Back({selector}) {
    return (
        <Box className="back">
            Item description.
            <label className="back-btn" htmlFor={selector}>
                <Tag padding={5}>
                    <ArrowBackIcon/>
                </Tag>
            </label>
        </Box>
    )
}

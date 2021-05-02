import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/">
            <Box marginX="7vw">
                <Link href="/">
                    <a className="logo">cookhouse</a>
                    {/* <Image height="35px" src="/assets/logo.png" alt="logo"></Image> */}
                </Link>
            </Box>

        </Link>
    )
}
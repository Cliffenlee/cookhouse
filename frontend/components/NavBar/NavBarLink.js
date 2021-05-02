import React from 'react'
import Link from 'next/link'
import { Box, Button } from "@chakra-ui/react"

export default function NavBarLink({ name, link }) {
    return (
        <Button width="5vw" colorScheme="orange" variant="link">
            <Link href={link}>
                <a>{name}</a>
            </Link>
        </Button>
    )
}
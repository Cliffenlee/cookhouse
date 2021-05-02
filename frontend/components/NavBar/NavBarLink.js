import React from 'react'
import Link from 'next/link'
import { Box } from "@chakra-ui/react"

export default function NavBarLink({ name, link }) {
    return (
        <Box width="10vw">
            <Link href={link}>
                <a className="nav-link">{name}</a>
            </Link>
        </Box>
    )
}
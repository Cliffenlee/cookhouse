import React from 'react'
import Link from 'next/link'
import { Box } from "@chakra-ui/react"

export default function NavBarLink({ name, link }) {
    return (
        <Box width="7vw">
            <Link href={link}>
                <a className="nav-link">{name}</a>
            </Link>
        </Box>
    )
}
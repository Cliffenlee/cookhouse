import React from 'react'
import Link from 'next/link'
import { Button } from "@chakra-ui/react"

export default function NavBarLink({ name, link }) {
    return (
        <Button colorScheme="orange" variant="link" mx="5">
            <Link href={link}>
                <a >{name}</a>
            </Link>
        </Button>
    )
}
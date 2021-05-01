import React from 'react'
import { Image } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/">
            <Image className="image" height="30px" objectFit="cover" src="/logo.png" alt="logo" />
        </Link>
    )
}
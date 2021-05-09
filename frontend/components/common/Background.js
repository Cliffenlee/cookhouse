import { Image } from '@chakra-ui/image'
import React from 'react'

export default function Background() {
    return (
        <Image zIndex="-1" position="fixed" top="0" left="0" src="/assets/kitchen.jpg" width="100vw"/>
    )
}

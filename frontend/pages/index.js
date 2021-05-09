import { Box, Flex, Image } from "@chakra-ui/react"

export default function Home() {
  return (
    <Flex height="100vh" width="200%" justifyContent="center" alignItems="center">
      <div className="home-shadow"/>
      <Image position="fixed" top="0" left="0" width="100vw" src="/assets/kitchen.jpg"/>
    </Flex>
  )
}

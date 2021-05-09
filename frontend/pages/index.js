import { Flex, Image } from "@chakra-ui/react"
import Background from "../components/common/Background"

export default function landing() {
  return (
    <Flex height="100vh" width="200%" justifyContent="center" alignItems="center">
      <div className="home-shadow"/>
      <Background/>
    </Flex>
  )
}

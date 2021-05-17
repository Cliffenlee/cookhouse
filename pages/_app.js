import '../styles/globals.css'
import Head from 'next/head'
import { Box, ChakraProvider } from '@chakra-ui/react'
import NavBarLanding from '../components/NavBar/NavBarLanding'
import NavBar from '../components/NavBar/NavBar'
import Background from '../components/common/Background'


function MyApp({ Component, pageProps }) {
  const nav = Component.name == "landing" ? <NavBarLanding/>  : <NavBar/>
  return (
    <ChakraProvider>
      <Head>
        <title>Cookhouse</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box height="100vh" overflow="hidden">
        {Component.name == "login" ? "" : nav}
        {Component.name == "login" ? "" : <Background/>}
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )

}

export default MyApp

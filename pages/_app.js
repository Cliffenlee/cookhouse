import '../styles/globals.css'
import Head from 'next/head'
import { Box, ChakraProvider } from '@chakra-ui/react'
import NavBarLanding from '../components/NavBar/NavBarLanding'
import NavBar from '../components/NavBar/NavBar'
import Background from '../components/common/Background'
import NavBarHome from '../components/NavBar/NavBarHome'


function MyApp({ Component, pageProps }) {
  const nav = Component.name == "landing" ? <NavBarLanding/> : Component.name == "home" ? <NavBarHome/> : <NavBar/>
  return (
    <ChakraProvider>
      <Head>
        <title>Cookhouse</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        {Component.name == "login" ? "" : nav}
        {Component.name == "home" || Component.name == "landing" ? <Background/> : ""}
        <Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
